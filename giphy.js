// on page load, search for & display a random gif matching your search term using the Giphy API.
// usage: 
//   include giphy.js in your <head>
//   set q to your search term (e.g. "brunch")
//   add <span id = "giphyme"></span> wherever you want to display the image. -- FYI, it will be centered.
// big ups to the Giphy crew (giphy.com)
// 2014 - Neal Shyam [@nealrs | nealshyam.com]




document.addEventListener('DOMContentLoaded', getGIF);

// var myarray = ["Simpsons","Futurama","Family Guy"];
var myarray = idf("A honeybee named Barry B. Benson (Jerry Seinfeld) has recently graduated from college and is about to enter the hive's Honex Industries honey-making workforce alongside his best friend Adam Flayman (Matthew Broderick). Barry is initially excited to join the workforce, but his courageous non-conformist attitude emerges upon discovering that his choice of job will never change once picked. Later, the two bees run into a group of Pollen Jocks, bees who collect pollen from flowers outside the hive. The Jocks offer to take Barry outside the hive to a flower patch, and he accepts. While on his first pollen-gathering expedition in New York City, Barry gets lost in the rain, and ends up on the balcony of a human florist named Vanessa (Renée Zellweger). Upon noticing Barry, Vanessa's boyfriend Ken (Patrick Warburton) attempts to squash him, but Vanessa gently catches and releases Barry outside the window, saving his life.Barry later returns to express his gratitude to Vanessa, breaking the sacred rule that bees are not supposed to communicate with humans. Barry and Vanessa develop a close bond, bordering on attraction, and spend time together frequently. Later, while Barry and Vanessa are walking through a grocery store, Barry is terrified to discover that the humans have been stealing and eating the bees' honey for centuries. He decides to journey to Honey Farms, which supplies the grocery store with its honey. Furious at the poor treatment of the bees in the hive, including the use of bee smokers to subdue the colony, Barry decides to sue the human race to put an end to the exploitation of bees.Barry's mission attracts wide attention from bees and humans alike, and hundreds of people show up to watch the trial. Although Barry is up against tough defense attorney Layton T. Montgomery (John Goodman) the trial's first day goes well. That evening, Barry is having dinner with Vanessa when Ken shows up. Vanessa leaves the room, and Ken expresses to Barry that he hates Barry and Vanessa spending time together. When Barry leaves to use the restroom, Ken ambushes Barry and attempts to kill him, only for Vanessa to intervene and break up with Ken.The next day at the trial, Montgomery harshly criticises bees, which causes Adam into stinging him. Adam's actions jeopardize the bees' credibility and put Adam's life in danger, though he manages to survive. While visiting Adam in the hospital, Barry notices a man smoking outside, and is struck by inspiration. The next day, Barry wins the trial by exposing the jury to the cruel treatment bees are subjected to, particularly the smoker, and humans are banned from stealing honey from bees ever again. Having lost the trial, Montgomery cryptically warns Barry that a negative shift in the balance of nature is imminent. As it turns out, the sudden, massive stockpile of honey has put every bee out of a job, including the vitally important Pollen Jocks. As a result, without anything to pollinate them, the world's flowers slowly begin to die out. Before long, the only flowers left with healthy pollen are those in a flower parade in Pasadena, California. Barry and Vanessa travel to the parade and steal a parade float, which they load onto a plane to be delivered to the bees so they can re-pollinate the world's flowers. When the plane's pilot and copilot are knocked unconscious, Vanessa is forced to land the plane, with help from Barry and the bees from Barry's hive. Armed with the pollen of the last flowers, Barry and the Pollen Jocks manage to reverse the damage and save the world's flowers, restarting the bees' honey production. Humans and bees are seen working together, and certain brands of honey are now bee-approved. Barry becomes a member of the Pollen Jocks, helping to pollinate the world's plants. Barry is also seen running a law firm inside Vanessa's flower shop, titled Insects at Law, handling disputes between animals and humans. The film ends with Barry flying off to a flower patch with the Pollen Jocks.");

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
            q = myarray[i];
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
