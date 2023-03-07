import express from "express";
import logout from "../controllers/logoutController.js";

const router = express.Router();

router.post("/", logout);
export default router