import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
import { json } from 'stream/consumers';
import Comment from '../models/Comment.js';
import main from '../config/gemini.js'
import User from '../models/User.js';

export const addBlog = async(req, res) => {
    try {
        console.log('addBlog req.user:', req.user);
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        const userId = req.user._id;

        if(!title || !description  || !category || !imageFile){
            return res.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        
        //uploading image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        //url transformation through image optimization
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression of image file
                {format: 'webp'},  //conversion to mordern format
                {width: '1280'}   //width resizing
            ]
        })

        const image = optimizedImageUrl;
        const user = await User.findById(userId);
        const author = user ? user.name : 'Blog-ai Admin';
        
        const newBlog = new Blog({
            title, subTitle, description, category, image, isPublished, user: userId, author
        });
        await newBlog.save();

        res.json({
            success: true,
            message: "Blog added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({
            success: true,
            blogs
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogById = async(req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({
                success: false,
                message: "Blog not found"
            })
        }
        res.json({
            success: true,
            blog
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBlogById = async(req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);

        //deleting comment
        await Comment.deleteMany({
            blog: id
        });
        
        res.json({
            success: true,
            message: 'Blog deleted succesfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const togglePublish = async(req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({
            success: true,
            message: "Blog status updated"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addComment = async(req, res) => {
    try {
        let userId = null;
        let name = req.body.name || 'Unknown';

        // If authenticated, use user from token
        if (req.user && req.user._id) {
            userId = req.user._id;
            const user = await User.findById(userId);
            name = user ? user.name : name;
        }

        const { blog, content } = req.body;

        if (!blog || !content) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        await Comment.create({
            blog,
            name,
            content,
            user: userId
        });

        res.json({
            success: true,
            message: "Comment added for review"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export const getBlogComments = async(req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({
            blog: blogId, isApproved: true
        }).sort({
            createdAt: -1
        })
        res.json({
            success: true,
            comments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const generateContent = async(req, res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content with research and actual data on this topic in simple text format')
        res.json({
            success: true,
            content
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}