
const User = require('../models/user');
const AccessToken = require('../models/access_token');
const crypto = require('crypto');
const ResetPasswordMailer = require('../mailers/reset_password_mailer');


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

module.exports.forgotPassword = function(request, response) {
    return response.render('forgotPassword', {
        title: 'PostIt | ForgotPassword'
    });
}

module.exports.requestResetPassword = async function(request, response) {
    try {
        const email = request.body.email;
        const user = await User.findOne({email: email});
        if (!user) {
            request.flash('error', 'Invalid Email!');
            return response.redirect('back');
        }

        const token = crypto.randomBytes(32).toString('hex');
        const userId = user._id;
        const userName = user.name;
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await AccessToken.deleteMany({userId: userId});

        const accessToken = new AccessToken({token, userId, expiresAt});
        await accessToken.save();

        const obj = {access_token: token, email, userName};
        ResetPasswordMailer.newToken(obj);
        
        request.flash('success', 'Password Reset Link Sent To Your Mail!');
        return response.redirect('back');
    }
    catch (error) {
        console.log('error --> user_controller -> requestResetPassword ', error);
        return;
    }
}

module.exports.resetPasswordLink = async function(request, response) {
    const access_token = request.query.access_token;
    const accessTokenDoc = await AccessToken.findOne({token: access_token});
    if (!accessTokenDoc) {
        await request.flash('error', 'Link Expired, Request Again!');
        return response.redirect('/users/forgotPassword');
    }

    const userId = accessTokenDoc.userId;
    return response.render('resetPassword', {
        title: 'PostIt | ResetPassword',
        userId: userId
    })
}

module.exports.resetPassword = async function (request, response) {
    const userId = request.query.userId;
    const password = request.body.password;
    const confirm_password = request.body.confirm_password;

    if (password != confirm_password) {
        request.flash('error', 'Passwords Don\'t Match!');
        return response.redirect('back');
    }

    await User.findByIdAndUpdate(userId, {password: password});
    await AccessToken.deleteMany({userId: userId});
    request.flash('success', 'Password Updated Successfully!');
    return response.redirect('/users/signIn');
}

