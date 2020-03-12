const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.registerUser = async (req, res) => {
  //TODO: Fill with actuall id's once the form has been created;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const school = req.body.school;
  const role = req.body.optradio;

  res.send(`${first_name} ${last_name} ${email} ${school} ${role}`);
};

