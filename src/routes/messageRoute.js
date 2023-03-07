import express from "express";
import messageContoller from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/",messageContoller.SendMessage)
router.get("/",  authMiddleware,messageContoller.getMessage);
router.get("/:id", authMiddleware, messageContoller.getoneMessage);
router.delete("/:id", authMiddleware, messageContoller.deleteMessage);



export default router