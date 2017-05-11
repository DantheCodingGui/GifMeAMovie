var wordArray = {} //array that contains key words for relevant film
var socket = io.connect('http://rishi.doubletrouble.co:8000'); //define socket connecing to domain on port 8000
var popularFilms = ["The Dark Knight", "Gladiator", "Toy Story 3", "Forrest Gump", "The Prestige", "Amadeus", "Jurassic Park", "Jaws"]; //select films for quiz
var i = 0; //counter
var q;
var isQuiz = false;


function randomFilm() {


    var randomNum = Math.floor((Math.random() * popularFilms.length - 1) + 0) //
    var filmName = popularFilms[randomNum]

    socket.emit('queryDB', {title: filmName});


    socket.on('array', function(data) {
        wordArray = data.Words;
        if(wordArray != 0) {
            q = wordArray[0];
            quizGIF();
        }
    })
}

function quizGIF() {



    request = new XMLHttpRequest; //allows for loading url without having to refresh page
    request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q, true); //use of giphy api key

    request.onload = function quizGIF() {
        if (i < wordArray.length) { //increments array index
            i++;
            q = wordArray[i]; //re-assign query
        }

        if (i == wordArray.length) { //condition to restart the loop if the last gif has been shown
            i = 0;
            q = wordArray[i];
            quizGIF();
        }

        // console.log(request.status);


        console.log(q); //for seeing the query

        if (request.status >= 200 && request.status < 400) { //in other words, if the request was a success
            data = JSON.parse(request.responseText).data.image_mp4_url;
            // document.getElementById("giphyme").innerHTML = '<center><img onclick="getGIF()" src = "'+data+'"  title="GIF via Giphy"></center>';
            // if (mp4Link.length = myarray.length) //make so that stores links so doesnt need to show a different summary
            document.getElementById("quizgif").innerHTML = '<center><video src="'+data+'" autoplay onended="quizGIF()"></video>';//show mp4
        } else {

            console.log('reached giphy, but API returned an error'); //error handling
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send(); //sends request at thet end
}

