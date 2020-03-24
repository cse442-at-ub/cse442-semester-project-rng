
const express = require('express');
const RegisterController = require('../controller/register');
const router = express.Router();

router.post('/course-create', RegisterController.registerUser);

module.exports = router;