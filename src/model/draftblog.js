import mongoose from "mongoose";

const draftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Draft = mongoose.model("Draft", draftSchema)

export default Draft