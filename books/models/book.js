const mongoose = require('mongoose')

const schema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [3, 'Too short product name'],
			required: [true, 'you should enter book name'],
		},
		slug: {
			type: String,
			lower: true,
		},
		description: {
			type: String,
			minLength: [20, 'enter more description'],
			required: [true, 'enter product description'],
		},
		colors: [String],
		price: {
			type: Number,
			required: [true, 'Book should have price'],
		},
		priceAfterDiscount: {
			type: Number,
		},
		quantity: {
			type: Number,
			required: [true, 'enter quantity of book'],
		},
		images: [String],
		imageCover: {
			type: String,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		stock: Boolean,
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [true, 'Book must belong to category'],
		},
		subCategories: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'SubCategory',
			},
		],
		brand: {
			type: mongoose.Schema.ObjectId,
			ref: 'Brand',
		},
		ratingsAverage: {
			type: Number,
			min: [1, 'it must be greater than 1.0'],
			max: [5, 'it must be less than 5.0'],
			// required: true,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)


module.exports = mongoose.model('Book', schema)
