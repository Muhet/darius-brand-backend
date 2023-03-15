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