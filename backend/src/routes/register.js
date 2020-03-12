const express = require('express');
const RegisterController = require('../controller/register');
const router = express.Router();

router.post('/register', RegisterController.registerUser);

module.exports = router;