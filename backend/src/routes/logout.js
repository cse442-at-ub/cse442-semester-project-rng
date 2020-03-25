const express = require('express');
const auth = require('../auth/auth');
const router = express.Router();

router.get('/logout', auth.isLoggedIn, (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;