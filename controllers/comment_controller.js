
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createComment = async function (request, response) {
    try {
        const post = await Post.findById(request.params.id);
        const comment = await Comment.create({
            commentContent: request.body.commentContent,
            post: request.params.id,
            user: request.user.id
        })

        post.comments.push(comment);
        post.save();

        response.redirect('back');
    }
    catch (error) {
        console.log('error --> comment__controller -> createComment ', error);
    }
}

module.exports.deleteComment = async function (request, response) {

    const commentId = request.params.id;
    try {
        const comment = await Comment.findById(commentId);
        if (comment.user == request.user.id) {
            const postId = comment.post;
            await Comment.deleteOne({_id: comment._id});
            await Post.findByIdAndUpdate(postId, {
                $pull: {comments: comment._id}
            })
        }

        response.redirect('back');
    }
    catch (error) {
        console.log('error --> comment_controller -> deleteComment ', error);
    }
}