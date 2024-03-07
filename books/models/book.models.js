const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
   
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    numberPages: {
      type: String,
      required: false
    },
    publisher: {
      type: String,
      require: false 
    },
    stock: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: false
    },
    userId:{type:mongoose.Schema.Types.ObjectId}
}, {timestamps:true})


module.exports = mongoose.model("Book", bookSchema)
