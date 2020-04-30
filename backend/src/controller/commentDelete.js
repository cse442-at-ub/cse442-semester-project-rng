const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.deleteComment = async (req, res) => {

  const comment_to_delete = req.session.comment_id;
  const comment_discussion = req.session.course_id

  const connection = await mysql.getConnection();

  await connection.execute(
    `DELETE FROM rng_comments WHERE comment_id=comment_to_delete`
  );

  res.redirect(`/discussion/${comment_discussion}`);
};