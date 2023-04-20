const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentController = require('../controllers/comment_controller');

router.post('/createComment/:id', passport.checkAuthentication, commentController.createComment);
router.get('/deleteComment/:id', passport.checkAuthentication, commentController.deleteComment);

module.exports = router;