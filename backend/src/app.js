const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
require('./database/mysql');
const activateRoute = require('./routes/activate');
const registerRoute = require('./routes/register');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(activateRoute);
app.use(registerRoute);

app.listen(PORT);
console.log('Listening on port ' + PORT);