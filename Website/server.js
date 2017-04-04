var express = require('express');  
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var url = 'mongodb://localhost:27017/gifs';

app.use(express.static('public'));

// Listen for requests
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('event', function(data) {
        MongoClient.connect(url, function(err, db) {
            console.log("Connected to database");

            insertDocuments(db, data, function() {
                db.close();
            });
        });
    });
});

var insertDocuments = function(db, data, callback) {
    var collection = db.collection('gifs');
    // Insert some documents 
    collection.insert(data, function(err, result) {
        console.log("Database entry made");
        callback(result);
    });
}


server.listen(8000);
