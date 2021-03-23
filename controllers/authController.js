const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// const AppError = require("../utils/errorHandler")
const User = require("../models/userModel")

exports.signup = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body
	console.log(req.body)

	const user = await User.findOne({ email })

	if (user) {
		res.json({msg:"User already exists"})
	} else {
		const hashed_password = await bcrypt.hash(password, 10)

		const user = await User.create({
			email,
			name,
			hashed_password,
		})

		if (!user) {
			res.status(500).json({msg:"Something went wrong"})
		}
		res.json({ status: "success", payload: "Signup completed." })
	}
})

exports.signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user) {
		const { hashed_password } = user
		const decoded = await bcrypt.compare(password, hashed_password)
		if (decoded) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			})
			return res.json({
				status: "success",
				payload: {
					id: user._id,
					name: user.name,
					num: user.num,
					email: user.email,
					token,
				},
			})
		}
		res.status(400).json({msg:"Invalid username or password"})
	}

	res.status(400).json({msg:"Invalid username or password"})
})