const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
    postedBy:{
        type: String,
    }
})

const User = mongoose.model("Post", postSchema)

module.exports = User