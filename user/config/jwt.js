const jwt = require("jsonwebtoken")
const User = require("../models/user.models")
class Auth{
    static auth = async(req,res, next)=>{
        try{
           const token = req.header("Authorization").replace("bearer ", "")
           const decoded = jwt.verify(token, process.env.JWTKEY);
           const user = await User.findOne({ _id: decoded._id });
           console.log({decoded, user});
           res.token = token;
           req.user = user;
           next();
        }
        catch(e){
            return res.status(500).json({status: "error",e});
        }
    }
}   
    
module.exports = Auth