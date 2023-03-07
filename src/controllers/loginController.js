import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const secret = "faustin";

const loginController = async (req, res) => {
    // email and password from the body
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        } else {
            // check if password is correct
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ message: "Please check your credentials carefully" });
            } else {
                // create a JWT and send it back to the client as an HTTP-only cookie
                const token = jwt.sign({ id: user._id }, secret);

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true, // I must remember to set this to true in production
                });

                return res.status(200).json({ message: "Logged in successfully" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }

};

export default loginController;
