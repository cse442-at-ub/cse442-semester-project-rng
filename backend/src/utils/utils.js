const mysql = require('../database/mysql');

module.exports.getFullNameFromID = async (userID) => {
  const connection = await mysql.getConnection();
  const [
    userQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_users` where `user_id` = ?',
    [userID]
  );

  if (userQueryResult.length === 0) {
    return '';
  }

  const user = userQueryResult[0];

  return user.first_name + ' ' + user.last_name;
};

module.exports.isEnrolled = async (user, courseID) => {
  const connection = await mysql.getConnection();
  const [
    enrollmentQueryResult,
  ] = await connection.execute(
    'SELECT * FROM `rng_enrollment` where `user_id` = ? AND`course_id` = ?',
    [user.user_id, courseID]
  );

  if (enrollmentQueryResult.length === 0) {
    return false;
  }

  return true;
};
