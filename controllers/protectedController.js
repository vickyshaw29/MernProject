const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.increment = asyncHandler(async (req, res) => {
	let { id } = req.user

	let user = await User.findById(id)

	user.num = user.num + 1

	user = await user.save()

	res.send({ status: "success", payload: user.num })
})

exports.decrement = asyncHandler(async (req, res) => {
	let { id } = req.user

	let user = await User.findById(id)

	user.num = user.num - 1

	user = await user.save()

	res.send({ status: "success", payload: user.num })
})