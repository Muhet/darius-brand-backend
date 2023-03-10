import bcrypt from 'bcrypt';
import User from "../model/user.js";
import errorFunc from "../utils/errorFunc.js";

class userController {
  // get all users
  static async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        data: users
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // get one user
  static async getUser(req, res) {
    try {
      const { id } = req.params; // using ES6
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({
          message: `User with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          data: user
        });
      }
    } catch (error) {
      console.log(error.message);
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  // create user
  static async createUser(req, res) {
    console.log(req)
    try {
      const { firstname, lastname, email, password } = req.body;  
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
      
  }

  // update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params; // using ES6

      // body to be update
      const { firstname, lastname, email, password: hashedPassword } = req.body;

      // id
      const _id = id;
      const userUpdated = await User.findByIdAndUpdate(_id, { firstname, lastname, email, password: hashedPassword }, { new: true });

      if (!userUpdated) {
        return res.status(404).json({
          message: `User with id: ${id} was not found`
        });
      } else {

        return res.status(200).json({
          message: "User updated Successfully",
          data: userUpdated
        });
      }

    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // delete User
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      // find user
      
      const _id = id

      const userToBeDeleted = await User.findByIdAndDelete(_id)

      if (!userToBeDeleted) {
        return res.status(404).json({
          message: `User with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
}

export default userController;
