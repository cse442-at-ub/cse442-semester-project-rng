const express = require('express');
const CoursesController = require('../controller/controller');
const router = express.Router();

router.post('/courses/create', CoursesController.createCourse);

router.get('/courses', (req, res) => {
  res.render('courses');
})

module.exports = router;