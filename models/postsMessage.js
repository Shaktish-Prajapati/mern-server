import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tag: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default: 0
    }
    // createdAt:{
    //     type: Date,
    //     default: new Date()
    // }
},{timestamps:true})

const PostMessage = mongoose.model('postMessage',postSchema)
export default PostMessage