import express from 'express'
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from './lib/db.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import { app, server } from "./socket/socket.js";
import path from 'path';

const __dirname = path.resolve();

dotenv.config();

//middleware setup
app.use(express.json());
app.use(cookieParser());

//Routes setup
//app.use("/api/status", (req,res)=>res.send("Server is running"));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/*splat", (req,res)=>{
    res.sendFile(path.join(__dirname, "/client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    connectDB();
    console.log(`listening at ${PORT}`)
});