import mongoose from "mongoose";

//create function to connect to mongodb db
export const connectDB = async () => {
    try {

        mongoose.connection.on('connected',()=>{console.log("DB connected")});
         await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
        
    } catch (error) {
        console.log(error);
    }
}