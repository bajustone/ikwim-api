const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : '23.229.233.105',
  user     : 'rustuser',
  password : 'rustuserpass',
  database : 'db_ikwim'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  connection.end();
});