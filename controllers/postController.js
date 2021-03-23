const Post = require("../models/Postmodel");
const { post } = require("../routes/authRoutes");
const _=require('lodash');
const { json } = require("express");
exports.postByid=(req,res,next,id)=>{
    Post.findById(id)
    
    .exec((err,post)=>{
        if(err||!post){
            return res.status(400).json({error:err})
        }
        req.post=post
        next()
    })
}
// getting all the posts from the db
exports.getPosts=async(req,res)=>{
    try {
        const posts=await Post.find()
        if(posts){
            res.status(200).json(posts)
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
}
//creating a post
exports.createPost=(req,res)=>{
    const post=new Post(req.body);
    post.save((err,result)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.status(200).json({
            post:post
        })
    })
}
// updating a post
exports.updatePost=(req,res,next)=>{
    let post=req.post;
    // console.log(post)
    post=_.extend(post,req.body)
    post.save(err=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.json(post);
    })
}
// deleting a post
exports.deletePost=async(req,res)=>{
    let post=req.post;
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        res.json({msg:"post deleted"})
    })
    
}