// Array to store all of the correct answers
// Array to store all worng answers
var wronganswers = "Titanic, Fight Club, The Matrix, Pulp Fiction, Goodfellas, Shawshank Redemption, Inception, The Godfather, Star Wars".split(", ")

// Variable to store current question number
var current = -1

// Variable to store the score
var score = 0

var correctAnswer;

// Function that increases score for every correct answer
function RightAnswer() {
    score++
    var id;
    switch(correctAnswer) {
        case 1:
            id = "bt1";
            break;
        case 2:
            id = "bt2";
            break;
        case 3:
            id = "bt3";
            break;
        case 4:
            id = "bt4";
            break;
    }
    document.getElementById(id).style.backgroundColor = "green";
    window.setTimeout(function()
        {
        document.getElementById(id).style.backgroundColor = "white";
        nextquestion()
        }, 1000);

}

// Function that changes the question to the next question
function nextquestion(){
    current++
    // showGif()
    var quizFilmName = randomFilm(); //using method from quiztest

    var answer = Math.ceil(Math.random()*4)
    document.getElementById("score").innerHTML = "Question "+(current+1)
    wronganswers = shuffle(wronganswers);


    button1 = nextquestion
    document.getElementById("bt1").innerHTML = wronganswers[0]
    button2 = nextquestion
    document.getElementById("bt2").innerHTML = wronganswers[1]
    button3 = nextquestion
    document.getElementById("bt3").innerHTML = wronganswers[2]
    button4 = nextquestion
    document.getElementById("bt4").innerHTML = wronganswers[3]

    switch(answer){
        case 1:
            button1 = RightAnswer
            correctAnswer = 1;
            document.getElementById("bt1").innerHTML = quizFilmName
            break;
        case 2:
            button2 = RightAnswer
            correctAnswer = 2;
            document.getElementById("bt2").innerHTML = quizFilmName
            break;
        case 3:
            button3 = RightAnswer
            correctAnswer = 3;
            document.getElementById("bt3").innerHTML = quizFilmName
            break;
        case 4:
            button4 = RightAnswer
            correctAnswer = 4;
            document.getElementById("bt4").innerHTML = quizFilmName
            break;

    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// Function to display the GIF's
// function showGif()
// {
//     randomFilm();
//     // q = answers[current]; // search query
//     // request = new XMLHttpRequest;
//     // request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
//     // console.log(q)
//     // document.getElementById("quizgif").innerHTML = '<center><h2>Loading...</h2></center>';

//     // request.onload = function() {
//     //     if (request.status >= 200 && request.status < 400){
//     //         data = JSON.parse(request.responseText).data.image_url;
//     //         console.log(data);
//     //         document.getElementById("quizgif").innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
//     //     } else {
//     //         console.log('reached giphy, but API returned an error');
//     //     }
//     // };
//     // request.send()
// }
