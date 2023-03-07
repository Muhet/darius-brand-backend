import express from "express";
import signupController from "../controllers/signupController.js";

const router = express.Router();

router.post("/", signupController);
router.get("/", signupController);


export default router