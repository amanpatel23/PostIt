const Post = require("../models/post")

module.exports.createPost = async function(request, response) {
    
    try {
        const post = await Post.create({
            postContent: request.body.postContent,
            user: request.user._id
        })

        request.flash('success', 'post created successfully!');
        return response.redirect('back');
    }catch (error) {
        console.log('error --> post_controller -> createPost ', error);
    }
}

module.exports.deletePost = async function(request, response) {
    try {
        const post = await Post.findById(request.params.id);
        if (post.user == request.user.id) {
            await Post.deleteOne({_id: post._id});
        }

        request.flash('success', 'post deleted successfully!');
        return response.redirect('back');
    } catch (error) {
        console.log('error --> post_controller -> deletePost ', error);
    }
}