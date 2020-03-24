const express = require('express');
const LoginController = require('../controller/login');
const router = express.Router();

router.post('/login', LoginController.login);

router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;