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

io.on('test', function(socket){
    console.log('message received');

});

server.listen(8000);
