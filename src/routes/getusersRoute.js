import express from "express";
import getAllUsers from "../controllers/gettingAllusers.js";

const router = express.Router();

router.get("/", getAllUsers);


export default router