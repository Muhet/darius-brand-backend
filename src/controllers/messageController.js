import errorFunc from '../utils/errorFunc.js';
import Message from "../model/message.js";

class messageController {

    // get all Messages
    static async getMessage(req, res) {
        try {
            const messages= await Message.find();
            res.status(200).json({
                data: messages
            });
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }

    // // get one Message
    static async getoneMessage(req, res) {
        try {
            const { id } = req.params; // using ES6
            const message = await Message.findOne({ _id: id });
            if (!message) {
                return res.status(404).json({
                    message: `message with id: ${id} was not found`
                });
            } else {
                return res.status(200).json({
                    data: message
                });
            }
        } catch (error) {
            console.log(error.message);
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }
    // Send message
    static async SendMessage(req, res) {
        try {
            const { username, email, message } = req.body;
            const newMessage = await Message.create({ username, email ,message});
            res.status(201).json({
                message: "New Message sent successfully",
                data: newMessage
            });
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }

    // delete message
    static async deleteMessage(req, res) {
        try {
            const { id } = req.params;
            // find Message

            const _id = id

            const messageToBeDeleted = await Message.findByIdAndDelete(_id)

            if (!messageToBeDeleted) {
                return res.status(404).json({
                    message: `Message with id: ${id} was not found`
                });
            } else {
                return res.status(200).json({
                    message: "Message deleted successfully",
                });
            }
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }
}

export default messageController;