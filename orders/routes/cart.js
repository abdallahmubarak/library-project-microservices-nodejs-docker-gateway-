  
const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');
const cart = require('../models/cart');
 
router.post('/addBookToCart',Cart.addBookToCart)
router.get('/getUserCart',Cart.getUserCart)
router.patch('/applyCoupon',Cart.applyCoupon)
router.delete('/delBool/:id',Cart.delBookFromCart)
router.delete('/emptyCart/:id',Cart.emptyCart)



module.exports = router;