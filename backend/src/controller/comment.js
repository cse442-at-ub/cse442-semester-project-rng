const mysql = require('../database/mysql');

module.exports.postComment = async (req, res) => {
  let d = new Date();

  let date = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
    '0' + d.getDate()
  ).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(
    -2
  )}:${('0' + d.getSeconds()).slice(-2)}`;

  //const user = req.session.user;
  const referer = req.headers.referer;
  //const course_id = req.params.courseID;
  //const user_id = user.user_id;
  //const discussion_id = req.body.discussionID;
  const body = req.body.body;

  const connection = await mysql.getConnection();

  await connection.execute(
    `INSERT INTO rng_comments (course_id, created_by, created_on, discussion_id, body) 
                    VALUES ("7" , "18" , "${date}" , 
                    "26" , "${body}")`
  );

  res.send('Inserted Comment into Database');
};
