import mongoose from 'mongoose'
import PostMessage from '../models/postsMessage.js'

// keep all logic related to route here

export const getPost = async (req,res)=>{
    // getting the available post in the DB
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res) => {
    // creating a post to store in the DB
    const post =  req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save() //bcz it is async action
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async (req,res)=>{
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Id does not exists')
    const post = req.body
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true})
    res.status(201).json(updatedPost)
}

export const deletePost = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Cannot perform delete operation!')
    await PostMessage.findByIdAndRemove(id)
    res.json({message:'Delete successful'})
}

export const likePost = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Connot like')
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true})
    res.status(201).json(updatedPost)
}