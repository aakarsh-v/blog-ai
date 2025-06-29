import UserModel from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

const signup = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const user = await UserModel.findOne({ email});
        if(user) {
            return res.status(409).json({
                message: "User already exists",
                sucess: false
            })
        }
        const userModel = new UserModel({
            name,
            email,
            password
        })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await UserModel.findOne({ email});
        const errorMsg = "Invalid email or password";
        if(!user) {
            return res.status(403).json({
                message: errorMsg,
                sucess: false
            })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({
                message: errorMsg,
                sucess: false
            })
        }
        const jwtToken = jwt.sign({
            email: user.email,
            _id: user._id,
            name: user.name
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        
    }
}

const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({user: req.user._id}).sort({createdAt: -1});
        res.json({
            success: true,
            blogs
        })
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

const getAllComments = async(req, res) => {
    try {
        const userBlogs = await Blog.find({ user: req.user._id }).select('_id');
        const blogIds = userBlogs.map(blog => blog._id);
        const comments = await Comment.find({ blog: {$in: blogIds}})
        .populate("blog")
        .sort({
            createdAt: -1
        })
    
        res.json({success: true, comments})
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

const getDashboard = async(req, res) => {
    try {
        const recentBlogs = await Blog.find({user: req.user._id}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments({user: req.user._id});
        const userBlogs = await Blog.find({ user: req.user._id }).select('_id');
        const blogIds = userBlogs.map(blog => blog._id);
        const comments = await Comment.countDocuments({ blog: { $in: blogIds } });
        const drafts = await Blog.countDocuments({user: req.user._id, isPublished: false});

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

const deleteCommentById = async(req, res) => {
    try {
        const {id} = req.body;
        const comment = await Comment.findOne({_id: id});
        if(comment.user.toString() !== req.user._id){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            })
        }
        await Comment.findByIdAndDelete(id);
        res.json({
            success: true, 
            message: "Comment deleted successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

const approveCommentById = async(req, res) => {
    try {
        const {id} = req.body;
        const comment = await Comment.findOne({_id: id});
        const blog = await Blog.findById(comment.blog);
        if (!blog || blog.user.toString() !== req.user._id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to approve this comment"
            });
        }
        await Comment.findByIdAndUpdate(id, {
            isApproved: true
        })
        res.json({
            success: true,
            message: "Comment approved successfully"
        })
    } catch (error) {
        res.json({
            success:false,
            message : error.message
        })
    }
}

const addComment = async(req, res) => {
    try {
        const {blog, content} = req.body;
        const user = await UserModel.findById(req.user._id);

        await Comment.create({
            blog, 
            name: user.name, // Use the user's name from the database
            content, 
            user: req.user._id // Associate comment with the user
        })
        res.json({
            success: true,
            message: "Comment added successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export {
    signup,
    login,
    getAllBlogs,
    getAllComments,
    getDashboard,
    deleteCommentById,
    approveCommentById,
    addComment
};