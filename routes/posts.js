const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.post('/createPost', passport.checkAuthentication, postController.createPost);
router.get('/deletePost/:id', passport.checkAuthentication, postController.deletePost);

module.exports = router;