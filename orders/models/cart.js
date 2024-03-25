const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		cartItem: [
			{
				book: {
					type: mongoose.Schema.ObjectId,
					ref: 'Book',
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: Number,
			},
		],
		totalCartPrice: Number,
		totalPriceAfterDiscount: Number,
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)
module.exports = mongoose.model('Cart', schema)
