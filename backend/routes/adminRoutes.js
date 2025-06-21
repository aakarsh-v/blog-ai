import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/login", adminLogin)
router.get("/comments", auth,getAllComments);
router.get("/blogs", auth,getAllComments);
router.post("/delete-comment", auth, deleteCommentById);
router.post("/approve-comment", auth, approveCommentById);
router.get("/dashboard", auth,getDashboard);

export default router;