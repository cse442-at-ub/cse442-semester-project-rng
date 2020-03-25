const express = require('express');
const auth = require('../auth/auth');
const LoginController = require('../controller/login');
const router = express.Router();

router.post('/login', LoginController.login);

router.get('/login', auth.isNotLoggedIn, (req, res) => {
  res.render('login');
})

module.exports = router;