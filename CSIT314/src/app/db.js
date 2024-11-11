const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',   // Database host (e.g., 'localhost' or an IP address)
  user: 'root',  // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'acc_db'  // Your database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('error connecting to database: ', err.stack);
    return;
  }
  console.log('connected to database as id ' + connection.threadId);
});

module.exports = connection;
