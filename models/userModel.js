const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	hashed_password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	num: {
		type: Number,
		default: 0,
	},
})

const User = mongoose.model("Users", userSchema)

module.exports = User