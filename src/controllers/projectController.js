import Project from "../model/project.js";
import errorFunc from "../utils/errorFunc.js";

class projectController {
  // get all projects
  static async getProjects(req, res) {
    try {
      const projects = await Project.find();
      res.status(200).json({
        data: projects
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // get one project
  static async getProject(req, res) {
    try {
      const { id } = req.params; // using ES6
      const project = await Project.findOne({ _id: id });
      if (!project) {
        return res.status(404).json({
          message: `Project with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          data: project
        });
      }
    } catch (error) {
      console.log(error.message);
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
  // create project
  static async createProject(req, res) {
    console.log(req)
    try {
      const { title, image, description } = req.body;
      const newProject = await Project.create({ title, image, description});
      res.status(201).json({
        message: "New project created successfully",
        data: newProject
      });
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // update project
  static async updateProject(req, res) {
    try {
      const { id } = req.params; // using ES6

      // body to be update
      const { title, image, description } = req.body;

      // id
      const _id = id;
      const projectUpdated = await Project.findByIdAndUpdate(_id, { title, image, description }, { new: true });

      if (!projectUpdated ) {
        return res.status(404).json({
          message: `Project with id: ${id} was not found`
        });
      } else {

        return res.status(200).json({
          message: "Project updated Successfully",
          data: projectUpdated 
        });
      }

    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }

  // delete project
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      // find project
      
      const _id = id

      const projectToBeDeleted = await Project.findByIdAndDelete(_id)

      if (!projectToBeDeleted) {
        return res.status(404).json({
          message: `Project with id: ${id} was not found`
        });
      } else {
        return res.status(200).json({
          message: "Project deleted successfully",
        });
      }
    } catch (error) {
      const messageContent = error.message;
      const status = 500;
      errorFunc(res, messageContent, status);
    }
  }
}

export default projectController;
