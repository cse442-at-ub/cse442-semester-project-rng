const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.postDiscussion = async (req, res) => {

  let date = new Date();
  const created_on = date.toString();

  const course_id = req.params.courseID;
  const user_id = user.user_id;
  const title = req.body.discussion-title;
  const body = req.body.discussion-content;

  const connection = await mysql.getConnection();

  await connection.execute(
    `INSERT INTO rng_discussion (course_id, created_by, created_on, title, body) 
                    VALUES ("${course_id}" , "${user_id}" , "${created_on}" , 
                    "${title}" , "${body}")`
  );

  res.send(`Inserted discussion into DB`);
};
