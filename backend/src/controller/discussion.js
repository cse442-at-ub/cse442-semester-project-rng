const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.postDiscussion = async (req, res) => {
  //https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const user = req.session.user;

  const course_id = req.params.courseID;
  const user_id = user.user_id;
  const title = req.body.title;
  const body = req.body.body;

  const connection = await mysql.getConnection();

  await connection.execute(
    `INSERT INTO rng_discussions (course_id, created_by, created_on, title, body) 
                    VALUES ("${course_id}" , "${user_id}" , "${date}" , 
                    "${title}" , "${body}")`
  );

  res.redirect(`/classroom/${course_id}`);
};
