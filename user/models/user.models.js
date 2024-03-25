const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'name required'],
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		minLength: [8, 'short password'],
	},
	confirmPassword: {
		type: String,
		validate: {
			validator: function (val) {
				return val === this.password
			},
			message: 'confirm password is wrongs',
		},
	},
	image: { type: String, default: 'default.jpg' },
	role: {
		type: String,
		default: 'user',
		enum: ['admin', 'user'],
		select: false,
	},
	slug: {
		type: String,
		lower: true,
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	changePasswordAt: Date,
	resetCode: String,
	codeExpires: Date,
	isVerified: Boolean,
})


userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()
	this.password = await bcrypt.hash(this.password, 12)
	this.confirmPassword = undefined
	next()
})

userSchema.methods.generateToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id}, process.env.JWTKEY)
  user.tokens.push({token})
  await user.save()
  return token
}

module.exports = mongoose.model("User", userSchema)