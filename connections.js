const mysql = require("mysql");
const creds = require("./msyql-cred.json");

exports.getMSQLConnection = function () {
    const connection = mysql.createConnection(creds);
    connection.connect();
    return connection;
}
