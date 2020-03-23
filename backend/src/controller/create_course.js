const mysql = require('../database/mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.registerUser = async (req, res) => {
  //TODO: Fill with actuall id's once the form has been created;
  const instructor = req.body.instructor;
  const name = req.body.name;
  const term = req.body.term;

  const connection = await mysql.getConnection();

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    await connection.execute(
      `INSERT INTO rng_courses (course_instructor, course_name, course_term, ) 
                  VALUES ("${name}" , "${term}")`
    );
  });

  res.send(`Inserted user into DB`);

  
};