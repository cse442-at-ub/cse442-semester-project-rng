const mysql2 = require('mysql2/promise');

class MySQL {
  constructor() {
    this.connection = mysql2.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
}

let mysql;

module.exports.getConnection = async () => {
  if (!mysql) {
    mysql = new MySQL();
  }
  return mysql.connection;
};
