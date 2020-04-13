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
  const user = req.session.user;
  const ID = user.user_id;
  const code = req.body.code;

  const [
    userQueryResult
  ] = await connection.execute(
    'SELECT * FROM `rng_courses` where `course_code` = ?',
    [code]
  );

  if (userQueryResult.length === 0) {
    return res.send('There is no course with that code');
  }

  const course_id = userQueryResult[0];

  const connection = await mysql.getConnection();
  await connection.execute(
    `INSERT INTO rng_enrollment (user_id, course_id) 
                VALUES ("${ID}" , "${course_id}")`
  );

  res.redirect('/courses')
}