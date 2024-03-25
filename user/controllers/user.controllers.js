const User = require('../models/user.models');
const bcrypt=require('bcryptjs')
const jwt  = require('jsonwebtoken')
const slugify = require('slugify')
const SendMail =require("../config/sendMail")
const signToken = require('../config/jwt')

//const client = require('../config/cache')
//const {setWthTTL , clearUserCache } = require('../config/cache');


exports.signup = async (req, res) => {
    try {
        
      if (!req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.confirmPassword 
                ) {  
        throw  'Please Enter Data Correct'
      }
      const user = new User ({
        name:req.body.name,
        email: req.body.email,
        password:req.body.password,
        confirmPassword:  req.body.confirmPassword
          })
      await user.save();      
      //await new SendMail(user).sendWelcome()
      console.log(user)
      return res.status(200).json({status: "user added",user});

    } catch (err) {
        return res.status(500).json({status: "error user added",err});

    }
  };
  
  
  exports.login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
          if (!user) { return res.status(401).json({ message: 'Invalid name or password' });}
          const isMatch =  bcrypt.compare(password, user.password);
          if (!isMatch) { return res.status(401).json({ message: 'Invalid name or password' });}
          const token = jwt.sign(
            {  _id: user._id,},
            process.env.JWTKEY,
            {
              expiresIn: "1d",
            }
          );  
          
          return res.status(200).json({status: "user login",user,token});
        }
        catch(err){
            return res.status(500).json({status: "user error login",err});
        }
  };

  // endpoint forget password
 
    exports.forgetPassword = async(req,res)=>{
    const email = req.body;
    if (!email) return res.status(400).json({status:'Enter your mail'});
    // get user
	const user = await User.findOne({ email });
    if (!user) return res.status(400).json({status:'no user found with this mail'});
    // generate random 6 digits
	const pinCode = user.generateResetCode()
	await user.save({ validateBeforeSave: false })
	//send mail
    try {
		const mail = new SendMail(user, pinCode)
		await mail.sendResetPassword()
		res.status(200).json({ msg: 'mail sent' })
	} catch (err) {
		console.log(err)
		user.resetCode = undefined
		user.codeExpires = undefined
		user.isVerified = undefined
		user.save()
		res.status(500).json({ msg: 'something went wrong' })
	}
  }

  // verify pin 
  exports.verifyPin = async (req, res, next) => {
	const { code } = req.body
	if (!code || `${code}`.length < 5)
    res.status(400).json({ msg: 'incorrect pin code' })
	const hashedCode = crypto.createHash('sha256').update(`${code}`).digest('hex')
	const user = await User.findOne({
		resetCode: hashedCode,
		codeExpires: { $gt: Date.now() },
	})
	if (!user)
		res.status(400).json({msg:'code may be wrong or expired try again'})
	user.isVerified = true
	await user.save({ validateBeforeSave: false })
	res.status(200).json({ msg: 'success' })
}

//  reset password 
exports.resetPassword = async (req, res, next) => {
	const { email, newPassword, newConfirm } = req.body
	const user = await User.findOne({ email })
	if (!user) return res.status(400).json({msg:'no user found with this mail'}) 
	if (!user.isVerified)
	if (!user) return res.status(400).json({msg:'Reset code not verified'})
	user.password = newPassword
	user.confirmPassword = newConfirm
	user.changePasswordAt = Date.now()
	user.isVerified = undefined
	user.codeExpires = undefined
	user.resetCode = undefined
	await user.save()
	const token = signToken(user._id)
	res.status(200).json({
		status: 'success',
		data: {
			token,
		},
	})
}
//authorization role 
exports.allowTo =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(new AppError(401, 'un authorized to this route'))
		next()
	}


//update password
exports.updatePassword = async (req, res, next) => {
	const { password, newPassword, confirmNew } = req.body
	const user = await User.findById(req.user.id).select('+password')
	if (!(await user.checkPasswords(password, user.password)))
		return res.status(401).json({msg:'wrong password , try again'})
	user.password = newPassword
	user.confirmPassword = confirmNew
	await user.save()
	const token = signToken(user._id)
	res.status(200).json({
		status: 'success',
		data: {
			token,
		},
	})
}

exports.findAllUsers = async (req, res) => {
    try {

        const users = await User.find()
        console.log(users)
      return res.status(200).json({status: "correct users view",users});

    } catch (err) {
        console.log('error to find all user', err)
        return err
    }
};

exports.findOneUser = async (req, res) => {
    
    try {

        let cacheKey=  req.params.id;
         console.log(cacheKey)
        const userFromCache = await client.get(cacheKey);
        if(userFromCache){
            return res.status(200).json({status: "correct to findone user from cache",userFromCache});
        }else{
            
        let user = await User.findById(cacheKey)
        await client.set(cacheKey, JSON.stringify(user));
        if (!user) {
            throw "please login "
        }
        return res.status(200).json({status: "correct to findone user",user});

        }
    } catch (err) {
        console.log('user findOne Error: %s', err)
        console.log('req.params.id: %s', req.params.id)
        return err
    }
    };

exports.updateUser = async (req, res) => {
 
    try {
        
        if (!req.params.id) {
            throw 'please login'
        }
        
        const userId = req.params.id;
        let userInfo = req.body;
        console.log(userId,userInfo)
 
        User.findOneAndUpdate({ _id: userId }, userInfo, { new: true })
        //const user = await User.findById(userId)
        return res.status(200).json({status: "correct to update user",userId,userInfo});

    } catch (err) {
        console.log('update %s', err)
        return handler(err, req, res);
    }
};
 
exports.deleteUser = async (req, res) => {
    try {
        var  userId  = req.params.id;
        if (!userId) {
            throw 'please login .....'
        }
        
        let clearUserFromCache = await clearUserCache(userId)
        if (clearUserFromCache === 1) {
            return res.json({ Result: "User succesfully deleted from Redis Cache" });
        let clearUserFromDb = await User.findOneAndDelete(userId)
            if (clearUserFromDb===1) {
                return res.json({ Result: "User succesfully deleted from data base" });   
            }else{
                return res.json({ Result: `There is no value depend of key in data base: ${userId}` })
            }
        }
        return res.json({ Result: `There is no value depend of key in Redis Server: ${userId}` })
        
    } catch (err) {
        console.log('user delete error %s', err)
        return res.json({ Result: `There is no value depend of key in Redis Server:` ,err })


    }

};
/*
async function updateBalance(order){
    try{
        console.log('updateBalance.....', order)
        const user = await User.findById(order.userID);

        if (order.price > user.balance.amount){
            const error = {
                code: 'C002', 
                message: 'Do not have enough funds',
                order
            }
            throw error
        }

        const query  = {
            '_id': order.usereID
        }
        const update = {
            $inc: {'balance.amount': - order.price }
        }       
        await User.updateOne(query, update);
        console.log('balance updated')
        global.io.emit('closingOrder', order)
    
    }catch (err){
        global.io.emit('rollback_order', err)

    }

}

exports.updateBalance = updateBalance;
function handler(err, req, res) {
    console.log("body");
    console.log (req.body);
    console.log (err);

    if (err) {
        if (err.message) {
            return res.status(500).send({
                code: err.message
            });
        } else {
            return res.status(500).send({
                code: err
            });
        }
    }

    return res.status(500).send({
        code: "500",
        message: "Internal Server error"
    });
}
*/