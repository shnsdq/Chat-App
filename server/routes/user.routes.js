import express from "express"
import { protectRoute } from "../middleware/auth.js";
import {getUsersForSidebar } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", protectRoute,getUsersForSidebar);

export default userRouter