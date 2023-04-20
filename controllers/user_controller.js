
const User = require('../models/user');


module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {
        title: 'PostIt | SignUp'
    });
}

module.exports.signIn = function(request, response) {

    return response.render('user_sign_in', {
        title: 'PostIt | SignIn'
    });
}

module.exports.createUser = async function(request, response) {
    
    if (request.body.password != request.body.confirm_password) {
        return response.redirect('back');
    }

    try {
        const user = await User.findOne({email: request.body.email});
        if (!user) {
            await User.create(request.body);
        }
    }
    catch(error) {
        console.log('Error --> user_controller -> createUser ', error);
    }

    return response.redirect('back');
}

module.exports.createSession = function (request, response) {
    console.log('loggedIn succefully');
    request.flash('success', 'Welcome Back!');
    return response.redirect('/');
}

module.exports.destroySession = function (request, response) {
    request.logout(function (error) {
        if (error) {
            console.log('Error --> destroySession ', error);
            return;
        }
        request.flash('success', 'come back soon!')
        return response.redirect('/');
    })
}

module.exports.profile = async function(request, response) {
    try {
        const user = await User.findById(request.params.id);
        return response.render('user_profile', {
            title: 'PostIt | UserProfile',
            profile_user: user
        })
    } catch (error) {
        console.log('error --> user_controller -> profile ', error);
    }
}