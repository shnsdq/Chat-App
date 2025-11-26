import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
        },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
        },
    message:{
        type:String,
        reruired:true
    },
    
},  // createdAt, updatedAt
{timestamp:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;