const User = require('../models/user.models');
const bcrypt=require('bcryptjs')
const jwt  = require('jsonwebtoken')
//const client = require('../config/cache')


exports.createUser = async (req, res) => {
    try {
        
      if (!req.body.name ||
        !req.body.birthdate ||
        !req.body.password ||
        !req.body.address) {  
        throw  'Please Enter Data Correct'
      }
      const user = new User ({
        name: req.body.name,
        password:req.body.password,
        birthdate:  req.body.birthdate,
        address: req.body.address,
      })

      await user.save();      
      console.log(user)
      return res.status(200).json({status: "user added",user});

    } catch (err) {
        return res.status(500).json({status: "error user added",err});

    }
  };
  exports.loginUser = async (req, res) => {
    try {
        
        const { name, password } = req.body;
        const user = await User.findOne({ name });
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

  
exports.findAllUsers = async (req, res) => {
    try {

        const users = await User.find()
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

        if (!req.params.id) {
            throw 'please login .....'
        }
      
        await User.findOneAndDelete(req.params.id)
 
        return res.status(200).send({
            message: "user has been deleted"
        });
    } catch (err) {
        console.log('user delete error %s', err)
        return handler(err, req, res);
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