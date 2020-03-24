const express = require('express');
const LoginController = require('../controller/login');
const router = express.Router();

router.post('/login', LoginController.login);