var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'gifs'
});

connection.connect();

connection.query('SELECT * FROM GIF',function(err,rows){
      if(err) throw err;

      console.log('Data received from Db:\n');
      console.log(rows);
});

connection.end();
