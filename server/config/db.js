const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Opendoors744784",
  database: "SocialMedia",
});

module.exports = db;