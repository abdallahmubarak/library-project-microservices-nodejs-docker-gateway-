const User = require('../models/user.models');


exports.createUser = async (req, res) => {
    try {
        
      if (!req.body.name ||
        !req.body.birthdate ||
        !req.body.address) {  
        throw  'Please Enter Data Correct'
      }
      const user = new User ({
        name: req.body.name,
        birthdate:  new Date(req.body.birthdate),
        address: req.body.address,
      })
  
      await user.save();
      console.log(user)
      return res.status(200).json({status: "user added",user});

    } catch (err) {
        return handler(err, req, res);
    }
  };
 
exports.findAllUsers = async (req, res) => {
    try {

        const users = await User.find();
      return res.status(200).json({status: "correct users view",users});

    } catch (err) {
        console.log('error to find all user', err)
        return handler(err, req, res);
    }
};

exports.findOneUser = async (req, res) => {
    try {
         console.log(req.params.id)
        let user = await User.findById(req.params.id);
        if (!user) {
            throw "please login "
        }
        return res.status(200).json({status: "correct to findone user",user});

    } catch (err) {
        console.log('user findOne Error: %s', err)
        console.log('req.params.id: %s', req.params.id)
        return handler(err, req, res)
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