const express = require('express');
const auth = require('../auth/auth');
const mysql = require('../database/mysql');
const router = express.Router();

router.get('/profile', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;

  const connection = await mysql.getConnection();

  const [
    discussionQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_discussions` where `created_by` = ?',
    [user.user_id]
  );

  res.render('profile', {
    userFullName: user.first_name + ' ' + user.last_name,
    school: user.school,
    discussionsStarted: discussionQueryResult.length,
  });
});

module.exports = router;
