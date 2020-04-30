const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
require('./database/mysql');
const activateRoute = require('./routes/activate');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const coursesRoute = require('./routes/courses');
const logoutRoute = require('./routes/logout');
const discussionRoute = require('./routes/discussion');
const classroomRoute = require('./routes/classroom');
const commentDeleteRoute = require('./routes/commentDelete');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(activateRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(coursesRoute);
app.use(logoutRoute);
app.use(discussionRoute);
app.use(classroomRoute);
app.use(commentDeleteRoute);

app.listen(PORT);
console.log('Listening on port ' + PORT);
