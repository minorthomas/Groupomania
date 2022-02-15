//Imports
const mysql = require("mysql");

//Connect config
console.log("Tentative de connexion...");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(function (err) {
  if (err) {
    console.error("Connexion impossible " + err);
    return;
  }

  console.log("Connexion réussie");
});

module.exports = db;
