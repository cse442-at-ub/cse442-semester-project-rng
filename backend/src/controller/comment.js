const mysql = require('../database/mysql');

module.exports.postComment = async (req, res) => {
  let d = new Date();

  let date = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
    '0' + d.getDate()
  ).slice(-2)} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(
    -2
  )}:${('0' + d.getSeconds()).slice(-2)}`;

  const connection = await mysql.getConnection();

  const user = req.session.user;
  const referer = req.headers.referer;
  const user_id = user.user_id;
  const discussion_id = referer.split('/')[4];

  const [
    discussionQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_discussions` where `discussion_id` = ?',
    [discussion_id]
  );

  const discussion = discussionQueryResult[0];
  const course_id = discussion.course_id;
  const body = req.body.body;

  await connection.execute(
    `INSERT INTO rng_comments (course_id, created_by, created_on, discussion_id, body) 
                    VALUES ("${course_id}" , "${user_id}" , "${date}" , 
                    "${discussion_id}" , "${body}")`
  );

  res.redirect(referer.substring(21, referer.length));
};

module.exports.deleteComment = async (req, res) => {
  const referer = req.headers.referer;
  const comment_to_delete = req.body.commentID;

  const connection = await mysql.getConnection();

  await connection.execute(
    `DELETE FROM rng_comments WHERE comment_id=${comment_to_delete}`
  );

  res.redirect(referer.substring(21, referer.length));
};
