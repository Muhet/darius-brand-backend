import express from "express";
import commentController from "../controllers/commentController";

const router = express.Router();

router.post("/blog/create/:blogId/comments", commentController.createComment);
router.get("/blog/:blogId/comments", commentController.getoneComment);
router.delete("/blog/:blogId/comments/:commentId", commentController.deleteComment);

export default router