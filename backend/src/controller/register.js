const mysql = require('../database/mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.registerUser = async (req, res) => {
  //TODO: Fill with actuall id's once the form has been created;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  const email = req.body.email;
  const school = req.body.school;
  const user_type = req.body.user_type;

  const connection = await mysql.getConnection();

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    await connection.execute(
      `INSERT INTO rng_users (first_name, last_name, email, password, user_type, school, verified) 
                  VALUES ("${first_name}" , "${last_name}",  "${email}",  "${hash}", "${user_type}", "${school}", TRUE)`
    );
  });

  res.send(`Inserted user into DB`);

  
};

