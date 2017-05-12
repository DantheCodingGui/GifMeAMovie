//including npm modules
var express = require('express');  
var mongodb = require('mongodb'); //database module
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

    //following code receives film name from giphy.js and queries the db for words
    socket.on('queryDB', function(data) {
        filmTitle = data; //make new object called filmTitle
        console.log(filmTitle); //print title (debugging)

        MongoClient.connect(url, function(err, db) { //connect to DB
            console.log("Connected to database");
            var collection = db.collection('gifs'); //define collection of documents

            var query = {'FilmName': filmTitle.title } //define query
            collection.find(query).forEach( function(myDoc) { 
                console.log( "Words: " + myDoc.Words );  //print words array to server
            
                io.emit('array', {Words: myDoc.Words}); //send words to client
            } )

            db.close(); //close db connection
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
