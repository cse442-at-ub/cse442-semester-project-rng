const express = require('express');
const CoursesController = require('../controller/courses');
const router = express.Router();

router.post('/courses/create', CoursesController.createCourse);

router.get('/courses', (req, res) => {
  res.render('courses');
})

module.exports = router;