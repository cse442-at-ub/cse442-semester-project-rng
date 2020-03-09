const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
require('./database/mysql');
const activateRoute = require('./routes/activate');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

console.log(__dirname)

app.use(activateRoute);

app.listen(PORT);
console.log('Listening on port ' + PORT);