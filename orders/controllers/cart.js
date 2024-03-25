const Book = require('../../books/models/book')
const Cart = require('../models/cart')
const Coupon = require('../models/coupons')
const Order = require('../model/Order');
const mongoose = require("mongoose");


let calcTotalPrice = function (cart) {
	let totalPrice = 0
	cart.cartItem.forEach((item) => {
		totalPrice += item.quantity * item.price
	})
	cart.totalCartPrice = totalPrice
	cart.totalPriceAfterDiscount = undefined
}


exports.addBookToCart = async (req, res) => {
    const { bookId, quantity } = req.body; 
    // Get product ID and quantity from request body
    try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }
    const cart = await Cart.findOne({ userId: req.user._id }); 
    // Check if book already exists in cart
    let existingItem = null;
    if (cart) {
      existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    }
    // Update cart or create new cart item
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ bookId, quantity });
    }
    // Save the updated cart
	calcTotalPrice(cart);
    await cart.save()
    return res.status(200).json({ message: 'Product added to cart', cart ,calcTotalPrice });
    
  }
   catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error adding product to cart' });
  }
};


exports.delBookFromCart = async(req,res)=>{
	const cart = await Cart.findOneAndUpdate(
		{ user: req.user._id },
		{
			$pull: { cartItem: { _id: req.params.id } },
		},
		{ new: true }
	)
	if (!cart) return res.status(404),{msg: 'no cart for this user'}
	calcTotalPrice(cart)
	await cart.save()
	res.status(200).json({
		status: 'success', results: cart.cartItem.length,data: { cart, },
	})
}


