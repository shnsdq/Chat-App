import { Server } from "socket.io";
import http from 'http';
import express from 'express'

//create express app & http server
const app = express();

const server = http.createServer(app);

//Initialize socket.io server
 const io = new Server(server, {
    cors : {
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});
 
//Store online users
export const userSocketMap = {}; // {userId: socketId}

//Socket.io connection handler
io.on("connection", (socket)=>{
     console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;
   if(userId != "undefined") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //socket.on() is used to listen to the events.Can be used both on client & server side
    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {io,app,server}