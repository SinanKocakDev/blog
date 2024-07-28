import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Posts", postSchema)

export default Post