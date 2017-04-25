var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/gifs';
var Words = ["axax"];


MongoClient.connect(url, function(err, db) {
    console.log("Connected to database");
    var collection = db.collection('gifs');

        collection.find({ 'FilmName': "3 Idiots" }).forEach( function(myDoc) { 
            console.log( "Words: " + myDoc.Words ); 
        } )

    db.close();
});


// {"Words": true, "FilmName": false, "_id": false}
