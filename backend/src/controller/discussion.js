const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.postDiscussion = async (req, res) => {

  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const created_on = date.toString();

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

  res.send(`Inserted discussion into DB ${date}`);
};
