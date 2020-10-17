const mysql = require("mysql2");

// Create connection
/*
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gerKanuk55",
  database: "tandem",
});
*/
const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b690bd5185aff9",
  password: "1815f368",
  database: "heroku_e7f976b84f567b9",
  port: 3306
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});
module.exports = db;
