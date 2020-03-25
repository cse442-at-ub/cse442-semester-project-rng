const express = require('express');
const auth = require('../auth/auth');
const CoursesController = require('../controller/courses');
const router = express.Router();

router.post('/courses/create', CoursesController.createCourse);

router.get('/courses/create', (req, res) => {
  res.render('create_course')
})

router.get('/courses', auth.isLoggedIn, (req, res) => {
  res.render('courses');
})

module.exports = router;