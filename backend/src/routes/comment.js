const express = require('express');
const auth = require('../auth/auth');
const CommentController = require('../controller/comment');
const router = express.Router();

router.post('/comment/post', CommentController.postComment);

router.post('/comment/Delete', CommentController.deleteComment);

module.exports = router;
