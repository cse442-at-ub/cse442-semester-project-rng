const mysql = require('../database/mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

module.exports.createCourse = async (req, res) => {
  const isInstructor = user.user_type === 'Instructor';
  if (!isInstructor) {
    return res.send('You need to be an instructor to perform this action')
  }

  const instructor = req.body.instructor;
  const name = req.body.name;
  const term = req.body.term;

  const connection = await mysql.getConnection();
  await connection.execute(
    `INSERT INTO rng_courses (course_instructor, course_name, course_term, ) 
                VALUES ("${instructor}" , "${name}" , "${term}")`
  );

  res.send(`Inserted new course into DB`);
};

module.exports.enrollCourse = (req, res) => {

}