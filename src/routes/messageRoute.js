import express from "express";
import messageContoller from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/",messageContoller.SendMessage)
router.get("/",  messageContoller.getMessage);
router.get("/:id",  messageContoller.getoneMessage);
router.delete("/:id",  messageContoller.deleteMessage);



export default router