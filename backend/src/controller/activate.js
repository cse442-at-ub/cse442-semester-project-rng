const mysql = require('../database/mysql');

module.exports.activateUser = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.send(
      'Please use the link provided in the email that was sent to you'
    );
  }

  const connection = await mysql.getConnection();

  const [
    rows
  ] = await connection.execute(
    'SELECT * FROM `activation_codes` where `activation_code` = ?',
    [code]
  );

  if (rows.length === 0) {
    return res.send('Incorrect Activation Code');
  }

  return res.json(rows[0]);
};
