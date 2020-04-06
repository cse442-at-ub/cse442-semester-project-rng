const express = require('express');
const router = express.Router();

router.post('/login', LoginController.login);

router.get('/classroom', (req, res) => {
  res.render('classroom');
})

module.exports = router;