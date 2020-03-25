const express = require('express');
const RegisterController = require('../controller/register');
const router = express.Router();

router.post('/register', RegisterController.registerUser);

router.get('/register', (req, res) => {
  res.render('register');
})

module.exports = router;