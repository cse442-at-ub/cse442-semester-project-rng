const express = require('express');
const ActivateController = require('../controller/activate');
const router = express.Router();

router.get('/activate', ActivateController.activateUser);

module.exports = router;
