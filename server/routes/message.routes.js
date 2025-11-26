import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();


messageRouter.get("/:id", protectRoute,getMessages);
messageRouter.post("/send/:id", protectRoute,sendMessage);

export default messageRouter;