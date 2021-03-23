const express = require("express")
const { signup, signin } = require("../controllers/authController")
const { getPosts, createPost, updatePost, deletePost, postByid } = require('../controllers/postController')
const { runValidation } = require('../validators/index')
const { postValidate } = require('../validators/postValidator')
const {userValidate}=require('../validators/userValidator')
const router = express.Router()

router.post("/signup",userValidate,runValidation, signup)
router.post("/signin", signin)
router.get("/post", getPosts)
router.post("/post", postValidate, runValidation, createPost)
router.put('/post/:postId', updatePost)
router.delete('/post/:postId', deletePost)
// creating a postByid param
router.param("postId",postByid)
module.exports = router