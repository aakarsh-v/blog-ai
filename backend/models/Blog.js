import mongoose from 'mongoose'
import mongose, { mongo } from 'mongoose'

const blogSchema = new mongose.Schema({
    title: {
        type: String,
        required: true
    }, subTitile: {
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
        required: true
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('blog', blogSchema)

export default Blog;