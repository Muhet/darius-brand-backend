import jwt from "jsonwebtoken";
import User from "../model/user.js";

const secret = "faustin";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "You need to be logged in to perform this action",
        });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "You need to be logged in to perform this action",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "You need to be logged in to perform this action",
        });
    }
};

export default authMiddleware;
