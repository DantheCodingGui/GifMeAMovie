// on page load, search for & display a random gif matching your search term using the Giphy API.
// usage: 
//   include giphy.js in your <head>
//   set q to your search term (e.g. "brunch")
//   add <span id = "giphyme"></span> wherever you want to display the image. -- FYI, it will be centered.
// big ups to the Giphy crew (giphy.com)
// 2014 - Neal Shyam [@nealrs | nealshyam.com]




document.addEventListener('DOMContentLoaded', getGIF);

var myarray = ["Simpsons","Futurama","Family Guy"];

var q = myarray[0];
var i = 0;
var mp4Link = [];

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
        }
        
        console.log(q);

        if (request.status >= 200 && request.status < 400){
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

// minimal demo 

//<html>
//<head>
//      <title>giphy.js demo</title>
//      <script src="giphy.js"></script>
//</head>
//<body>
//      <span id = "giphyme"></span>
//</body>
//</html>
