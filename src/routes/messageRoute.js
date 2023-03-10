import express from "express";
import messageContoller from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/message/create",messageContoller.SendMessage)
router.get("/messages",  messageContoller.getMessage);
router.get("/message/:id",  messageContoller.getoneMessage);
router.delete("/message/delete/:id",  messageContoller.deleteMessage);



export default router

