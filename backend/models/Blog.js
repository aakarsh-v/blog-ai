import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, subTitle: {
        type: String
    }, description : {
        type: String,
        required: true
    }, category: {
        type: String,
        required: true
    }, image: {
        type: String,
        required: true
    }, isPublished: {
        type: Boolean,
        default: false,
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const BlogModel = mongoose.model('Blog', blogSchema)

export default BlogModel;