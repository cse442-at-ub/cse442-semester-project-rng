const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.registerUser = async (req, res) => {
    //TODO: Fill with actuall id's once the form has been created;
    const val1 = req.body.val1;
    const val2 = req.body.val2;

    const connection = await mysql.getConnection();

    await connection.execute(
        //TODO is the table correct?
        `INSERT INTO rng_discussion (arg1, arg2) 
                    VALUES ("${val1}" , "${val2}")`
    );

    res.send(`Inserted discussion into DB`);


};