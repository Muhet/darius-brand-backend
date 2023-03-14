import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/user/create", userController.createUser)
router.get("/users",  userController.getUsers);
router.get("/user/:id",  userController.getUser);
router.get("/user/update/:id",  userController.updateUser);
router.delete("/user/delete/:id",  userController.deleteUser);



export default router
