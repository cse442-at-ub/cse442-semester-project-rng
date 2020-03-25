const express = require('express');
const auth = require('../auth/auth');
const CoursesController = require('../controller/courses');
const router = express.Router();

router.post('/courses/create', auth.isLoggedIn, CoursesController.createCourse);

router.get('/courses/create', auth.isLoggedIn, (req, res) => {
  const isInstructor = user.user_type === 'Instructor';
  if (!isInstructor) {
    return res.send('You need to be an instructor to access this page')
  }
  res.render('create_course')
})

router.get('/courses', auth.isLoggedIn, (req, res) => {
  const user = req.session.user;
  const isInstructor = user.user_type === 'Instructor';
  res.render('courses', {
    isInstructor,
    school: user.school
  });
})

module.exports = router;