//giph.js handles the giphy api
//input = 10 word strings stored in array
//output = 10 gifs that are played on repeat
var socket = io.connect('http://gifmeamovie.co.uk:8080'); 
var reviewSubmitted = 0;
var myarray = {};//array that stores words- usually 10
var i = 0; // counter
var mp4Link = []; //array to store the mp4 link of the gif to help with future implementations
var q; //q represents the string search query for the giphy API
var isQuiz = false;


function callGetGIF() {
    // myarray = idf(filmName);//accessing html field (user typed summary)
    var filmName = document.getElementById("film-name").value;

    socket.emit('searchQueryDB', {title: filmName});

    socket.on('searchArray', function(data) {
        // console.log(data.Words);
        myarray = data.Words;
    })


    q = myarray[0];
    document.getElementById("upvote").display = "block";
    document.getElementById("downvote").display = "block";
    getGIF(q);
}

function getGIF() {


        request = new XMLHttpRequest; //allows for loading url without having to refresh page
        request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true); //use of giphy api key

        request.onload = function getGif() {
            if (i < myarray.length) { //increments array index
                i++;
                q = myarray[i]; //re-assign query
            }

            if (i == myarray.length) { //condition to restart the loop if the last gif has been shown
                i = 0;
                q = myarray[i];
                getGIF();
            }


            // console.log(q); //for seeing the query

            if (request.status >= 200 && request.status < 400) { //in other words, if the request was a success
                data = JSON.parse(request.responseText).data.image_original_url;
                mp4Link.push(data); //adding mp4 link to array
                // document.getElementById("giphyme").innerHTML = '<center><img onclick="getGIF()" src = "'+data+'"  title="GIF via Giphy"></center>';
                // if (mp4Link.length = myarray.length) //make so that stores links so doesnt need to show a different summary
                document.getElementById("searchgif").innerHTML = '<center><image height="400px" width = "auto" src="'+data+'" autoplay onended="getGIF()"></image>';//show mp4
            } else {
                console.log('reached giphy, but API returned an error'); //error handling
            }
        };

        request.onerror = function() {
            console.log('connection error');
        };

        request.send(); //sends request at thet end
    }
setInterval(getGIF, 4000);

