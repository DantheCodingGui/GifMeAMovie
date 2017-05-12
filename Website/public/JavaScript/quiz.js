// Array to store all of the correct answers
var answers = ['Shawshank Redemption', 'Batman', 'Simpsons', 'Family Guy', 'Inception']

// Array to store all worng answers
var wronganswers = "Titanic, Fight Club, The Matrix, Godfather, Pulp Fiction, Forrest Gump, Goodfellas".split(", ")

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
    console.log(score);
    // showGif()
    randomFilm(); //using method from quiztest
    var answer = Math.ceil(Math.random()*4)
    document.getElementById("score").innerHTML = "Question "+(current+1)+" of "+"5"
    button1 = nextquestion
    document.getElementById("bt1").innerHTML = wronganswers[Math.floor(Math.random()*wronganswers.length)]
    button2 = nextquestion
    document.getElementById("bt2").innerHTML = wronganswers[Math.floor(Math.random()*wronganswers.length)]
    button3 = nextquestion
    document.getElementById("bt3").innerHTML = wronganswers[Math.floor(Math.random()*wronganswers.length)]
    button4 = nextquestion
    document.getElementById("bt4").innerHTML = wronganswers[Math.floor(Math.random()*wronganswers.length)]
    switch(answer){
        case 1:
            button1 = RightAnswer
            correctAnswer = 1;
            console.log('answer is ' + correctAnswer);
            document.getElementById("bt1").innerHTML = answers[current]
            break;
        case 2:
            button2 = RightAnswer
            correctAnswer = 2;
            console.log('answer is' + correctAnswer);
            document.getElementById("bt2").innerHTML = answers[current]
            break;
        case 3:
            button3 = RightAnswer
            correctAnswer = 3;
            console.log('answer' + correctAnswer);
            document.getElementById("bt3").innerHTML = answers[current]
            break;
        case 4:
            button4 = RightAnswer
            correctAnswer = 4;
            console.log('answer is ' +  correctAnswer);
            document.getElementById("bt4").innerHTML = answers[current]		

    }
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
