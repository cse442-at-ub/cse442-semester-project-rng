const mysql = require('../database/mysql');
const bodyParser = require('body-parser');

module.exports.registerUser = async (req, res) => {
    //TODO: Fill with actuall id's once the form has been created;
    const discussion_id = req.body.discussion_id;
    const course_id = req.body.course_id;
    const creted_by = "user" //TODO Once the page has been created change to actually get user data, 

    let date = new Date;
    const created_on = date.toString();

    const title = req.body.title;
    const body = req.body.body;

    const connection = await mysql.getConnection();

    await connection.execute(
        //TODO is the table correct?
        `INSERT INTO rng_discussion (discussion_id, course_id, created_by, created_on, title, body) 
                    VALUES ("${discussion_id}" , "${course_id}" , "${creted_by}" , "${created_on}" , 
                    "${title}" , "${body}")`
    );

    res.send(`Inserted discussion into DB`);


};