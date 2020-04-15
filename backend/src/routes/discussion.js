const express = require('express');
const moment = require('moment');
const auth = require('../auth/auth');
const mysql = require('../database/mysql');
const utils = require('../utils/utils');
const DiscussionController = require('../controller/discussion');
const router = express.Router();

router.post(
  '/discussion/create/:courseID',
  auth.isLoggedIn,
  DiscussionController.postDiscussion
);

router.get(
  '/discussion/create/:courseID',
  auth.isLoggedIn,
  async (req, res) => {
    const user = req.session.user;
    const courseID = req.params.courseID;
    const connection = await mysql.getConnection();

    const [
      courseQueryResult,
    ] = await connection.execute(
      'SELECT * FROM `rng_courses` where `course_id` = ?',
      [courseID]
    );

    if (courseQueryResult.length === 0) {
      return res.send('There is no course with that ID');
    }

    if (await !utils.isEnrolled(user, courseID)) {
      return res.send('You are not enrolled in this course');
    }

    res.render('create_discussion', {
      userFullName: user.first_name + ' ' + user.last_name,
      school: user.school,
      courseID,
    });
  }
);

router.get('/discussion/:discussionID', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;

  const connection = await mysql.getConnection();
  const [
    discussionQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_discussions` where `discussion_id` = ?',
    [req.params.discussionID]
  );

  if (discussionQueryResult.length === 0) {
    return res.send('A discussion with that ID does not exist');
  }

  const discussion = discussionQueryResult[0];

  if (await !utils.isEnrolled(user, discussion.course_id)) {
    return res.send(
      'You are not enrolled in the course that this discussion is in'
    );
  }

  const createdBy = await utils.getFullNameFromID(discussion.created_by);
  const formattedDate = moment(discussion.created_on).format(
    'MMMM Do YYYY, h:mm:ss a'
  );
  const title = discussion.title;
  const body = discussion.body;
  const courseID = discussion.course_id;

  const [
    courseQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_courses` where `course_id` = ?',
    [courseID]
  );

  res.render('discussion', {
    userFullName: user.first_name + ' ' + user.last_name,
    courseName: courseQueryResult[0].course_name,
    courseID,
    createdBy,
    formattedDate,
    title,
    body,
  });
});

module.exports = router;
