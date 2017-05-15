var wordArray = {} //array that contains key words for relevant film
var socket = io.connect('http://http://gifmeamovie.co.uk:8080'); //define socket connecing to domain on port 8000
var popularFilms = ["The Dark Knight", "Gladiator", "Toy Story 3", "Forrest Gump", "The Prestige", "Amadeus", "Jurassic Park", "Jaws"]; //select films for quiz
var i = 0; //counter
var q;

function randomFilm() {


    var randomNum = Math.floor((Math.random() * popularFilms.length - 1) + 0) //pick a random element based on the size of the film array
    var filmName = popularFilms[randomNum] //obtain one film name from the array

    socket.emit('quizQueryDB', {title: filmName});//send the film name from client to server


    socket.on('quizArray', function(data) { //receive processed film in the form of an array of words
        wordArray = data.Words;
        if(wordArray != 0) {
            q = wordArray[0];
            quizGIF();
        }
    })
    return filmName;
}

function quizGIF() {



    request2 = new XMLHttpRequest; //allows for loading url without having to refresh page
    request2.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + q, true); //use of giphy api key

    request2.onload = function quizGIF() {
        if (i < wordArray.length) { //increments array index
            i++;
            q = wordArray[i]; //re-assign query
        }

        if (i == wordArray.length) { //condition to restart the loop if the last gif has been shown
            i = 0;
            q = wordArray[i];
            quizGIF();
        }

        // console.log(request2.status);

        console.log(q); //for seeing the query

        if (request2.status >= 200 && request2.status < 400) { //in other words, if the request2 was a success
            data = JSON.parse(request2.responseText).data.image_original_url;
            // document.getElementById("giphyme").innerHTML = '<center><img onclick="getGIF()" src = "'+data+'"  title="GIF via Giphy"></center>';
            // if (mp4Link.length = myarray.length) //make so that stores links so doesnt need to show a different summary
            document.getElementById("quizgif").innerHTML = '<center><image height="400px" width="auto" src="'+data+'" autoplay onended="quizGIF()"></image>';//show mp4
        } else {

            console.log('reached giphy, but API returned an error'); //error handling
        }
    };

    request2.onerror = function() {
        console.log('connection error');
    };

    request2.send(); //sends request2 at thet end
}
setInterval(quizGIF,4000);
