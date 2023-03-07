import User from '../model/user.js';
import errorFunc from '../utils/errorFunc.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "All Users fetched successfully",
            data: users
        });
    } catch (error) {
        const messageContent = error.message;
        const status = 500;
        errorFunc(res, messageContent, status);
    }
};

export default getAllUsers;
