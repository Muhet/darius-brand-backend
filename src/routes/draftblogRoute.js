import express from "express";
import blogController from "../controllers/draftblogController.js";

const router = express.Router();

router.get("/", blogController.getdraftBlogs);
router.get("/:id", blogController.getonedraftBlog)
router.post("/", blogController.createdraftBlog)
router.put("/:id", blogController.updatedraftBlog)
router.patch("/:id", blogController.updatedraftBlog)
router.delete("/:id", blogController.deletedraftBlog)

export default router