const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postContent: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: {
        currentTime: () => {
            const indianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
            return new Date(indianTime);
        }
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;