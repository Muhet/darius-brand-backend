import Draft from "../model/draftblog.js";
import errorFunc from "../utils/errorFunc.js";
import Blog from "../model/blog.js";

class draftblogController {
    // CRUD (Create, Read, Update, Delete) Operation
    // get all blogs
    static async getdraftBlogs(req, res) {
        try {
            const draftblogs = await Draft.find();
            res.status(200).json({
                data: draftblogs
            });
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }
    // get one blog
    static async getonedraftBlog(req, res) {
        try {
            const { id } = req.params; // using ES6
            const onedraftblog = await Draft.findOne({ _id: id });
            if (!onedraftblog) {
                return res.status(404).json({
                    message: `Draft with id: ${id} was not found`
                });
            } else {
                return res.status(200).json({
                    data: onedraftblog
                });
            }
        } catch (error) {
            console.log(error.message);
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }
    // create blog
    static async createdraftBlog(req, res) {
        try {
            const { title, image, content } = req.body;
            const newDraft = await Draft.create({ title, image ,content});
            res.status(201).json({
                message: "New blog Draft created successfully",
                data: newDraft
            });
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }

    // update blog
    static async updatedraftBlog(req, res) {
        try {
            const { id } = req.params; // using ES6

            // body to be update
            const { title, image,content } = req.body;

            // id
            const _id = id;
            const draftUpdated = await Draft.findByIdAndUpdate(_id, { title, image, content }, { new: true });

            if (!draftUpdated) {
                return res.status(404).json({
                    message: `Blog with id: ${id} was not found`
                });
            } else {

                return res.status(200).json({
                    message: "The blog with updated Successfully",
                    data: draftUpdated
                });
            }

        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }

    // delete blog
    static async deletedraftBlog(req, res) {
        try {
            const { id } = req.params;
            // find blog

            const _id = id

            const draftToBeDeleted = await Draft.findByIdAndDelete(_id)

            if (!draftToBeDeleted) {
                return res.status(404).json({
                    message: `draft with id: ${id} was not found`
                });
            } else {
                return res.status(200).json({
                    message: "Draft deleted successfully",
                });
            }
        } catch (error) {
            const messageContent = error.message;
            const status = 500;
            errorFunc(res, messageContent, status);
        }
    }
}

export default draftblogController;
