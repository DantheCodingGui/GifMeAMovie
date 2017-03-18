var express = require('express');  
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static('public'));

// Listen for requests
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('event', function(data) {
        var myJSON = JSON.stringify(data);
        console.log(myJSON);
    });
});

var insertDocuments = function(db, callback) {
    var collection = db.collection('gifs');
    // Insert some documents 
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

var url = 'mongodb://localhost:27017/';
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    insertDocuments(db, function() {
        db.close();
    });
});

server.listen(8000);
