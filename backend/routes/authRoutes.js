import express from "express";
import {login, signup, getAllBlogs, getAllComments, getDashboard, deleteCommentById, approveCommentById, addComment} from "../controllers/AuthController.js";
import {signupValidation, loginValidation} from "../middleware/AuthValidation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

router.get("/blogs", auth, getAllBlogs);
router.get("/comments", auth, getAllComments);
router.get("/dashboard", auth, getDashboard);
router.post("/delete-comment", auth, deleteCommentById);
router.post("/approve-comment", auth, approveCommentById);
router.post("/add-comment", auth, addComment);

export default router;