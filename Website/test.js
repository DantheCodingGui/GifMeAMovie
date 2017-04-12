var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/gifs';
var fs = require("fs");
var content = fs.readFileSync("example.json");

var jSon = JSON.parse(content); //parse JSON

console.log("Output Content : \n"+ content);

MongoClient.connect(url, function(err, db) {
    console.log("Connected to database");
    insertDocuments(db, jSon, function() {
    db.close();
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
