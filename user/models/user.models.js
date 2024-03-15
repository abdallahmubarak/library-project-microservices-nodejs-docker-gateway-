const mongoose = require("mongoose");
//const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
      unique: true
    },password:{
      
      type: String,
      required: true
    },
    birthdate: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    balance: {
      amount: {
        type: Number,
        default: 0
      },
      currency: {
        type: String,
        default: '€'
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId
      },
        token:{type:String}
    }
}, {timestamps:true})

userSchema.pre("save", async function(){
  const userData = this
  if(userData.isModified("password"))
      userData.password = await bcrypt.hash(userData.password, 10)
})

userSchema.statics.login = async(email, password)=>{
  const userData = await User.findOne({name})
  if(!userData) throw new Error("invalid name")
  const isvalid = await bcrypt.compare(password, userData.password)
  if(!isvalid) throw new Error("invalid password")
  return userData
}

userSchema.methods.generateToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
  user.tokens.push({token})
  await user.save()
  return token
}

module.exports = mongoose.model("User", userSchema)