const Book = require('../../books/models/book')
const Cart = require('../models/cart')
const Coupon = require('../models/coupons')
const Order = require('../model/Order');
const mongoose = require("mongoose");





exports.createOrder = async (req, res) => {
    try {
      if (!req.body.bookID ||
        !req.body.userId  ) {  
        throw  'please login '
      }

      let dateWeekmore = new Date();
      dateWeekmore.setDate(dateWeekmore.getDate() + 7);

      const newOrder ={
        bookId: mongoose.Types.ObjectId(req.body.bookId),
        userId: mongoose.Types.ObjectId(req.body.userId),
        initialDate: new Date(),
        deliveryDate: dateWeekmore
      }
      const order = new Order (newOrder)
  
      const orderSaved =await order.save();
    
      console.log('sending data..')
      global.io.emit('book_sold', orderSaved)
      
      return res.status(200).send()
    } catch (err) {
        return handler(err, req, res);
    }
  };
 

  exports.findAll = async (req, res) => {
    try {

        const orders = await Order.find();
        res.send(orders);

    } catch (err) {
        console.log('findAll %s', err)
        return handler(err, req, res);
    }
};


exports.findOneOrder = async (req, res) => {
    try {
         
        let order = await Order.findById(req.params.id);
        
        if (!order) {
            throw "R001"
        }
        const customerResponse = await axios.get(`http://localhost:5555/customers/${order.customerID}` )
        const bookResponse = await axios.get(`http://localhost:4545/books/${order.bookID}` )
        const orderObject = {
            customerName: customerResponse.data.name,
            bookTitle: bookResponse.data.title
        }
        res.send(orderObject);

    } catch (err) {
        console.log('order findOne Error: %s', err)
        return handler(err, req, res)
    }
};


exports.updateOrder = async (req, res) => {
    try {
        
        if (!req.params.id) {
            throw 'BRP'
        }
        
        const orderId = req.params.id;
        let orderInfo = req.body;
 
 
        Order.findByIdAndUpdate(orderId, orderInfo)
        const order = await Order.findById(orderId)
        res.send(order);

    } catch (err) {
        console.log('update %s', err)
        return handler(err, req, res);
    }
};
 
exports.deleteOrder = async (req, res) => {
    try {

        if (!req.params.id) {
            throw 'BRP'
        }
      
        await Order.findByIdAndRemove(req.params.id)
 

        return res.status(200).send({
            message: "Order has been deleted"
        });
    } catch (err) {
        console.log('order delete error %s', err)
        return handler(err, req, res);
    }

};
