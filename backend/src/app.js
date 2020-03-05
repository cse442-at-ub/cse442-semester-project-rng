const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./database/mysql');
const activateRoute = require('./routes/activate');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(activateRoute);

app.listen(PORT);
console.log('Listening on port ' + PORT);
