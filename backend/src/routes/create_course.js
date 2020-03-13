var mysql = require('../database/mysql');
var express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/course-create', urlencodedParser, async function(req, res){
    var con = await mysql.getConnection();
    console.log(req.body);
    res.render('contact-success', {data: req.body});
    var sql = "INSERT INTO courses (name, term) VALUES ('"+data.course+"', '"+data.term+"')";
});

module.exports = router;