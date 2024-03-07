const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
      unique: true
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
      }
    }
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema)