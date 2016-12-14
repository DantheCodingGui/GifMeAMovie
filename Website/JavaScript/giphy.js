var myarray;
var q;
var i = 0;
var mp4Link = [];

function callGetGIF() {
	myarray = idf(document.getElementById("summary").value);
	q = myarray[0];
	document.getElementById("summary").remove();
	document.getElementById("search").remove();
	getGIF();
}

function getGIF() {

    request = new XMLHttpRequest;
    request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);

    request.onload = function getGif() {
       if (i < myarray.length) {
           i++;
        q = myarray[i];
       }

        if (i == myarray.length) {
            i = 0;
            q = myarray[i];
        }
        
        console.log(q);

        if (request.status >= 200 && request.status < 400) {
            console.log()
            data = JSON.parse(request.responseText).data.image_mp4_url;
            mp4Link.push(data);
            // document.getElementById("giphyme").innerHTML = '<center><img onclick="getGIF()" src = "'+data+'"  title="GIF via Giphy"></center>';
            // if (mp4Link.length = myarray.length) //make so that stores links so doesnt need to show a different summary
            document.getElementById("giphyme").innerHTML = '<center><video src="'+data+'" autoplay onended="getGIF()"></video>';
        } else {
            console.log('reached giphy, but API returned an error');
        }
    };

    request.onerror = function() {
        console.log('connection error');
    };

    request.send();
}