const mysql = require('../database/mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.registerUser = async (req, res) => {
  //TODO: Fill with actuall id's once the form has been created;
  const code = req.body.code;

  const connection = await mysql.getConnection();

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    await connection.execute(
      `SELECT FROM rng_courses (course_code) 
                  VALUES ("${code}")`
    );
  });

  res.send(`Inserted user into DB`);

  
};