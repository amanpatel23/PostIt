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
router.get('/forgotPassword', userController.forgotPassword);
router.post('/requestResetPassword', userController.requestResetPassword);
router.get('/resetPasswordLink', userController.resetPasswordLink);
// router.get('/resetPasswordPage', userController.resetPasswordPage);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;