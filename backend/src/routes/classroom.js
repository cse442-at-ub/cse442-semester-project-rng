const express = require('express');
const auth = require('../auth/auth');
const mysql = require('../database/mysql');
const utils = require('../utils/utils');
const router = express.Router();

router.get('/classroom/:courseID', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const connection = await mysql.getConnection();
  const courseID = req.params.courseID;

  if (await !utils.isEnrolled(user, courseID)) {
    return res.send(
      'You are not enrolled in this course. You cannot view the contents of this course'
    );
  }

  const [
    discussionQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_discussions` where `course_id` = ?',
    [courseID]
  );

  res.render('classroom', {
    userFullName: user.first_name + ' ' + user.last_name,
    school: user.school,
    discussions: discussionQueryResult,
    courseID,
  });
});

module.exports = router;
