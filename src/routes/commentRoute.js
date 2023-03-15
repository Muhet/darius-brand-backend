import express from "express";
import { createComment, getComments, deleteComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/blog/create/:blogId/comments", createComment);
router.get("/blog/:blogId/comments", getComments);
router.delete("/blog/:blogId/comments/:commentId", deleteComment);

export default router