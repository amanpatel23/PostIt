const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function(request, email, password, done) {
    try {
        const user = await User.findOne({email: email});
        if (!user || user.password != password) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        console.log('error --> passport-local-strategy ', error);
        return done(error);
    }
}))

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    }
    catch (error) {
        console.log('error --> deserializeUser ', error);
        return done(error);
    }
})

passport.checkAuthentication = function(request, response, next) {
    if (request.isAuthenticated())  {
        return next();
    }

    request.flash('error', 'you\'re not Logged In!')
    return response.redirect('/users/signIn');
}

module.exports = passport;