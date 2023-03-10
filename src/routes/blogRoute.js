import express from "express";
import blogController from "../controllers/blogController.js";
/* import authMiddleware from "../middleware/authMiddleware.js"; */

const router = express.Router();

router.get("/blogs",blogController.getBlogs);
router.get("/blog/:id",blogController.getBlog);
router.post("/blogs/create", blogController.createBlog);
router.put("/blog/update/:id", blogController.updateBlog);
router.delete("/blog/delete/:id", blogController.deleteBlog);

export default router