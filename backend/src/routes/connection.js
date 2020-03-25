var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "zdziente",
  password: "mypassword",
  database: "mydb"
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/course-create', urlencodedParser, function(req, res){
    console.log(req.body);
    res.render('contact-success', {data: req.body});
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Insert a record in the "customers" table:
  var sql = "INSERT INTO courses (name, term) VALUES ('"+data.course+"', '"+data.term+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
