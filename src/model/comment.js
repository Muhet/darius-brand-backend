const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogPost: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
