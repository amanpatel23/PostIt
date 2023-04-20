
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
        request.flash('error', 'Passwords Doesn\'t Match!');
        return response.redirect('back');
    }

    try {
        const user = await User.findOne({email: request.body.email});
        if (!user) {
            await User.create(request.body);
            request.flash('success', 'User Created Successfully!');
            return response.redirect('/users/signIn');
        } else {
            request.flash('error', 'User Already Exists!')
        }
    }
    catch(error) {
        console.log('Error --> user_controller -> createUser ', error);
    }

    response.redirect('back');
}

module.exports.createSession = function (request, response) {
    request.flash('success', 'Welcome Back!');
    return response.redirect('/');
}

module.exports.destroySession = function (request, response) {
    request.logout(function (error) {
        if (error) {
            console.log('Error --> destroySession ', error);
            return;
        }
        request.flash('success', 'Come Back Soon!')
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