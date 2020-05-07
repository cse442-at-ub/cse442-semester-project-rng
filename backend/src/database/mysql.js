const mysql2 = require('mysql2/promise');

let connection;
console.log('REQUIRE MYSQL');

module.exports.getConnection = async () => {
  if (!connection) {
    connection = mysql2.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return connection;
};
