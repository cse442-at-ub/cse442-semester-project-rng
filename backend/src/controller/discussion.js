const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.postDiscussion = async (req, res) => {

  let d = new Date();

  let date = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + (d.getDate())).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;

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
