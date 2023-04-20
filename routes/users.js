const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.get('/signOut', userController.destroySession);
router.post('/createUser', userController.createUser);
router.post('/createSession', passport.authenticate('local', {
    failureRedirect: '/users/signIn'
}), userController.createSession);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);

module.exports = router;