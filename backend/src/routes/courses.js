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
    return res.send('You need to be an instructor to access this page')
  }
  res.render('create_course')
})

router.post('/courses/enroll', auth.isLoggedIn, CoursesController.enrollCourse);

router.get('/courses/enroll', auth.isLoggedIn, (req, res) => {
  
  res.render('enroll_course')
})

router.get('/courses', auth.isLoggedIn, async (req, res) => {
  const user = req.session.user;
  const isInstructor = user.user_type === 'Instructor';

  const connection = await mysql.getConnection();
  const [
    coursesQueryResult
  ] = await connection.execute(
    'SELECT * FROM `rng_courses` where `instructor` = ?',
    [user.user_id]
  );

  const instructor = user.first_name + " " + user.last_name;

  res.render('courses', {
    isInstructor,
    instructor,
    school: user.school,
    courses: coursesQueryResult
  });
})

module.exports = router;