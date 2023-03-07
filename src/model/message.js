import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        minLength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Message = mongoose.model("Message", messageSchema)

export default Message