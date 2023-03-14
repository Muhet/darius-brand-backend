import bcrypt from 'bcrypt';
import User from "../model/user.js";
import errorFunc from "../utils/errorFunc.js";

class userController {
  // get all users
  static async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ 'status': 'success', 'code': 200, 'message': 'fetch successful', data: users });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ 'status': 'fail', 'code': 500, 'message': "error", "data": null });
    }
  }

  // get one user
  static async getUser(req, res) {
    try {
      const { id } = req.params; // using ES6
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({'status': 'fail', 'code': 404, 'message': `User with id: ${id} was not found` });
       
      } else {
        res.status(200).json({'status': 'success', 'code': 200, 'message': 'User fetched successfully', data: user });
        
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({'status': 'fail', 'code': 500, 'message': "error", "data": null });
    }
  }
  // create user
  static async createUser(req, res) {
    const { firstname, lastname, email, password } = req.body;
    try {

      if (!(firstname || lastname || email || password)) {
        res.status(400).json({ 'status': 'fail', 'code': 400, 'message': "Please fill all required data", "data": null });
        return;
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create our new user
      const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });
      res.status(200).json({ 'status': 'success', 'code': 200, 'message': 'New User created successfully', data: newUser });

    } catch (error) {
      console.log(error)
      res.status(500).json({ 'status': 'fail', 'code': 500, 'message': "error", "data": null });
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
        return res.status(404).json({ 'status': 'fail', 'code': 404, 'message': `User with id: ${id} was not found` });
      } else {

        return res.status(200).json({ 'status': 'success', 'code': 200, 'message': "User updated Successfully", data: userUpdated });
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({ 'status': 'fail', 'code': 500, 'message': "error", "data": null });
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
        return res.status(404).json({'status':'fail', 'code': 404, 'message': `User with id: ${id} was not found`});
      } else {
        return res.status(200).json({'status':'success', 'code': 200,'message': "User deleted successfully",
        });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ 'status': 'fail', 'code': 500, 'message': "error", "data": null });
    }
  }
}

export default userController;
