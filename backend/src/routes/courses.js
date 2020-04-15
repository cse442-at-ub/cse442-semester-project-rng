const express = require('express');
const auth = require('../auth/auth');
const mysql = require('../database/mysql');
const CoursesController = require('../controller/courses');
const router = express.Router();

router.post('/courses/create', auth.isLoggedIn, CoursesController.createCourse);

router.get('/courses/create', auth.isLoggedIn, (req, res) => {
  const user = req.session.user;
  const isInstructor = user.user_type === 'Instructor';
  if (!isInstructor) {
    return res.send('You need to be an instructor to access this page');
  }
  res.render('create_course');
});

router.post('/courses/enroll', auth.isLoggedIn, CoursesController.enrollCourse);

router.get('/courses/enroll', auth.isLoggedIn, (req, res) => {
  res.render('enroll_course');
});

router.get('/courses', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const isInstructor = user.user_type === 'Instructor';

  const connection = await mysql.getConnection();
  const [
    coursesQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_courses` where `instructor` = ?',
    [user.user_id]
  );

  const instructor = user.first_name + ' ' + user.last_name;

  const [
    enrolledCoursesQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_enrollment` where `user_id` = ?',
    [user.user_id]
  );

  const enrolledCourses = [];
  let row;
  for (row of enrolledCoursesQueryResult) {
    const [
      courseQueryResult,
    ] = await connection.execute(
      'SELECT * FROM `rng_courses` where `course_id` = ?',
      [row.course_id]
    );

    const instructorID = courseQueryResult[0].instructor;

    const [
      instructorQueryResult,
    ] = await connection.execute(
      'SELECT * FROM `rng_users` where `user_id` = ?',
      [instructorID]
    );

    const enrolledCourse = {
      course_name: courseQueryResult[0].course_name,
      course_term: courseQueryResult[0].course_term,
      instructor:
        instructorQueryResult[0].first_name +
        instructorQueryResult[0].last_name,
    };

    enrolledCourses.push(enrolledCourse);
  }

  res.render('courses', {
    isInstructor,
    instructor,
    userFullName: user.first_name + ' ' + user.last_name,
    school: user.school,
    instructorCourses: coursesQueryResult,
    enrolledCourses: enrolledCourses,
  });
});

module.exports = router;
