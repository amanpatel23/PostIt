const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    commentContent: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;