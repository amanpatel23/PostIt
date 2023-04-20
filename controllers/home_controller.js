const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function(request, response) {
    try {
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        const users = await User.find({});

        return response.render('home', {
            title: 'PostIt | Home',
            posts: posts,
            users: users,
        });
    } catch (error) {
        console.log('error --> home_controller -> home ', error);
    }
}