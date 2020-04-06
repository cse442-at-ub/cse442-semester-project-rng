const express = require('express');
const RegisterController = require('../controller/discussion');
const router = express.Router();

router.post('/discussion', RegisterController.registerUser);

router.get('/discussion', (req, res) => {
  res.render('discussion');
})

module.exports = router;