const express = require('express');
const mysql = require('../database/mysql');
const auth = require('../auth/auth');
const CommentController = require('../controller/comment');
const router = express.Router();

router.post('/comment/post', auth.isLoggedIn, CommentController.postComment);

router.post(
  '/comment/delete',
  auth.isLoggedIn,
  CommentController.deleteComment
);

router.post(
  '/comment/edit/:commentID',
  auth.isLoggedIn,
  CommentController.editComment
);

router.get('/comment/edit/:commentID', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const connection = await mysql.getConnection();
  const [
    commentQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_comments` where `comment_id` = ?',
    [req.params.commentID]
  );

  const comment = commentQueryResult[0];

  res.render('edit_comment', {
    userFullName: user.first_name + ' ' + user.last_name,
    school: user.school,
    commentID: comment.comment_id,
    discussionID: comment.discussion_id,
    body: comment.body,
  });
});

module.exports = router;
