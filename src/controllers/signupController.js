import bcrypt from 'bcrypt';
import User from '../model/user.js';
import errorFunc from '../utils/errorFunc.js';

const signupController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create our new user
    const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });
    res.status(201).json({
      message: "New User created successfully",
      data: newUser
    });
  } catch (error) {
    const messageContent = error.message;
    const status = 500;
    errorFunc(res, messageContent, status);
  }

};

export default signupController;