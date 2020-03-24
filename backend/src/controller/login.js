const bcrypt = require('bcrypt');
const mysql = require('../database/mysql')

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const connection = await mysql.getConnection();

  const [
    userQueryResult
  ] = await connection.execute(
    'SELECT * FROM `rng_users` where `email` = ?',
    [email]
  );

  if (userQueryResult.length === 0) {
    return res.send('There is no user with that email');
  }

  const user = userQueryResult[0];
  const passwordHash = user.password;

  bcrypt.compare(password, passwordHash, function (err, result) {
    if (!result) {
      return res.send('Your password is incorrect');
    }

    req.session.user = user;

    return res.send('You\'ve successfully logged in')
  });
}