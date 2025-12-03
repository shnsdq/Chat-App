import express from 'express'
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from './lib/db.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import { app, server } from "./socket/socket.js";

dotenv.config();

//middleware setup
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes setup
app.use("/api/status", (req,res)=>res.send("Server is running"));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/user", userRouter);

//connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`listening at ${PORT}`));