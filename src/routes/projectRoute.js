import express from "express";
import projectController from "../controllers/projectController.js";
/* import authMiddleware from "../middleware/authMiddleware.js"; */

const router = express.Router();

router.get("/project",projectController.getProjects);
router.get("/project/:id",projectController.getProject);
router.post("/project/create", projectController.createProject);
router.put("/project/update/:id", projectController.updateProject);
router.delete("/project/delete/:id", projectController.deleteProject);

export default router


