const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "ayush",
  password: "Dac@1234",
  database: "student_system"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = db;
