const express = require('express');
const commentDeleteController = require('../controller/commentDelete');
const router = express.Router();

router.post('/commentDelete', commentDeleteController.deleteComment);

router.get('/commentDelete', (req, res) => {
  res.render('register'); //#todo change where this goes to
})

module.exports = router;