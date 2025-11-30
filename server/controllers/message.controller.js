import cloudinary from "../lib/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/Message.js";
import User from "../models/User.js"
import {io, userSocketMap} from "../server.js"

//Get all messages for selected users
export const getMessages = async (req,res) => {
    try {
        const {id: userToChatId} = req.params   // user you clicked on in chat
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
        participants:{$all: [senderId, userToChatId]}
       }).populate("messages");

       if(!conversation){
        return res.status(200).json([]);
       }

       const messages= conversation.messages;

        res.status(200).json({ messages});

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

//Send message to selected user
export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

       let conversation = await Conversation.findOne({
        participants:{$all: [senderId, receiverId]}
       })
        
       if(!conversation){
         conversation = await Conversation.create({
            participants: [receiverId,senderId],
         });
       }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //this will run in parallel
        await promise.all([conversation.save(),newMessage.save()]);

        //Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({success:true, newMessage})
        
    } catch (error) {
         console.log(error.message)
        res.status(500).json({ essage:error.message})
    }
}