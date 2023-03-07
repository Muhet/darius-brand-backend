import express from "express"
import blogRoute from "./blogRoute.js"
import signupRoute from "./signupRoute.js"
import messageRoute from "./messageRoute.js";
import loginRoute from "./loginRoute.js";
import projectRoute from "./projectRoute.js";
import getusersRoute from "./getusersRoute.js";
import logoutRoute from "./logoutRoute.js";

const router = express.Router()

// all routes
router.use("/blogs", blogRoute)
router.use("/signup",signupRoute )
router.use("/message",messageRoute)
router.use("/login", loginRoute)
router.use("/project",projectRoute)
router.use("/users",getusersRoute)
router.use("/logout",logoutRoute)

export default router