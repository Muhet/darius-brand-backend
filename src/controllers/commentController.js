import Comment from "../model/comment.js";

import Joi from "joi";

// Create a comment
export const createComment = async (req, res, next) => {
  try {
    const { error } = validateComment(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const comment = new Comment({
      blog: req.params.blogId,
      commentBody: req.body.commentBody,
    });

    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Get all comments for a blog
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
//Get all comments
export const getAllComments = async (req, res, next) => {
 const allComments = req.body;
    try {
if(!allComments){
res.status(404).json({"status": "failled", "code": 404, "message": "No comment in DataBase"});
return;
}
  const comments = await Comment.find({}).sort({_id: -1}).limit(10);
      res.status(200).json({"status": "success","code": 200,"message": "All Blog posts", data: comments});
        
    } catch (error) {
      console.log(error)
      res.status(500).json({'status': 'fail','code': 500, "message" : "Error", "data": null});
    }
  }



// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      blog: req.params.blogId,
    });

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    await comment.remove();

    res.status(200).send("Comment deleted successfully");
  } catch (err) {
    next(err);
  }
};

// Joi validation schema for comments
function validateComment(comment) {
  const schema = Joi.object({
    commentBody: Joi.string().min(10).max(2000).required(),
  });

  return schema.validate(comment);
}