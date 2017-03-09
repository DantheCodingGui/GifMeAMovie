//giph.js handles the giphy api
//input = 10 word strings stored in array
//output = 10 gifs that are played on repeat
var myarray;//array that stores words- usually 10
var q; //q represents the string search query for the giphy API
var i = 0; // counter
var mp4Link = []; //array to store the mp4 link of the gif to help with future implementations

function callGetGIF() {
	myarray = idf(document.getElementById("summary").value);//accessing html field (user typed summary)
                                                                //runs string through idf() from tfidf.js
	q = myarray[0];                                     
	document.getElementById("summary").remove();
	document.getElementById("submit-sum").remove();
	getGIF();
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
        }
        
        console.log(q); //for seeing the query

        if (request.status >= 200 && request.status < 400) { //in other words, if the request was a success
            data = JSON.parse(request.responseText).data.image_mp4_url;
            mp4Link.push(data); //adding mp4 link to array
            // document.getElementById("giphyme").innerHTML = '<center><img onclick="getGIF()" src = "'+data+'"  title="GIF via Giphy"></center>';
            // if (mp4Link.length = myarray.length) //make so that stores links so doesnt need to show a different summary
            document.getElementById("searchgif").innerHTML = '<center><video src="'+data+'" autoplay onended="getGIF()"></video>';//show mp4
        } else {
            console.log('reached giphy, but API returned an error'); //error handling
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send(); //sends request at thet end
}

function upVote() {
    console.log("upboated");
}

function downVote() {
    console.log("downBoated");
}
