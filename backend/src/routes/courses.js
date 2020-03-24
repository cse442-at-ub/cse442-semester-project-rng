const express = require('express');
const RegisterController = require('../controller/register');
const router = express.Router();

router.post('/course-create', RegisterController.registerUser);

router.get('/courses', (req, res) => {
  res.render('courses');
})

module.exports = router;