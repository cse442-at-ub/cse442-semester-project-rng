const mysql = require('../database/mysql');

module.exports.createCourse = async (req, res) => {
  const user = req.session.user;
  const isInstructor = user.user_type === 'Instructor';
  if (!isInstructor) {
    return res.send('You need to be an instructor to perform this action')
  }

  const instructorID = user.user_id
  const name = req.body.name;
  const term = req.body.term;

  const connection = await mysql.getConnection();
  await connection.execute(
    `INSERT INTO rng_courses (instructor, course_name, course_term) 
                VALUES ("${instructorID}" , "${name}" , "${term}")`
  );

  res.redirect('/courses')
};

module.exports.enrollCourse = (req, res) => {

}