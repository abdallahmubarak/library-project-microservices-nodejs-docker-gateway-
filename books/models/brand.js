const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'you should enter brand name'],
			unique: [true, 'brand name should be unique'],
			minLength: [2, 'Too short name for brand'],
		},
		slug: {
			type: String,
			lower: true,
		},
		image: String,
	},
	{
		timestamps: true,
	}
)

const Brand = mongoose.model('Brand', schema)
module.exports = Brand
