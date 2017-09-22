// This file sets up mysql connections

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dummy',
  password : 'dummy',
  database : 'railres'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
