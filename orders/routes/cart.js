  
const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');
const cart = require('../models/cart');
 
router.post('/addBookToCart',Cart.addBookToCart)
router.delete('/delBool/:id',Cart.delBookFromCart)
module.exports = router;