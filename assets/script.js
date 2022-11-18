const setTimer = document.querySelector("#time");
const startBtn = document.getElementById("startBtn");
const highScoreDiv = document.querySelector(".highScores");
const header = document.getElementById("header");
const instructions = document.getElementById("instructions");
const questionCard = document.querySelector("#question");
const answer1 = document.getElementById("option1");
const answer2 = document.getElementById("option2");
const answer3 = document.getElementById("option3");
const questionsDiv = document.querySelector(".questions");
const answerButton = [answer1, answer2, answer3];
const subBtn = document.querySelector("#subBtn");
const username = document.querySelector("#username");
const hsInput = document.querySelector("#highScoreInput");
let nextQuestion = 0

renderHighScores();

let secondsLeft = 20;
let questions = [ 
    'All are Data types except.',
    'Where do you link the script file to the HTML?',
    'What is the method to remove the last item from an array?',
    'What do you use to end a line in JavaScript?'
];
let answers = [ 
    [{a: 'String', correct: false}, {a:'Boolean', correct: false}, {a: 'Const', correct: true}],
    [{a: 'Body', correct: false}, {a:'Both', correct: true}, {a: 'Head', correct: false}],
    [{a: 'Pop', correct: true}, {a:'Push', correct: false}, {a: 'Take', correct: false}],
    [{a: ' . ', correct: false}, {a:' / ', correct: false}, {a: ' ; ', correct: true}],
];

function renderHighScores(){ 
    var name = localStorage.getItem("name");
    username.textContent = name;
};
    subBtn.addEventListener("click", function(event){
    event.preventDefault();

    var name = document.querySelector("#high-input").value;

    localStorage.setItem("name", name);
    renderHighScores();
});


for (let i = 0; i < answerButton.length; i++) { 
    answerButton[i].addEventListener('click', function (e) {
        console.log(e.target.innerText);
        const selectedAnswer = answers[nextQuestion].find(function (answer) {
            return answer.a === e.target.innerText
        })
        console.log(selectedAnswer); 
        if (selectedAnswer.correct) {
        } else {
            secondsLeft -= 5
        }
        nextQuestion++; 
        if (nextQuestion > 3) {
            showHighScore();
            clearInterval(timerInterval);
        } else {
            displayQuestion();
        }
    });
};

function showHighScore() { 
    questionsDiv.setAttribute("style", "display:none");
    highScoreDiv.setAttribute("style", "display:block");
};

function displayQuestion() { 

    for (let i = 0; i < questions.length; i++) {
    questionCard.textContent = questions[nextQuestion];
    answer1.textContent = answers[nextQuestion][0].a;
    answer2.textContent = answers[nextQuestion][1].a;
    answer3.textContent = answers[nextQuestion][2].a;
    }
};

function setTime() { 
    header.setAttribute("style", "display:none");
    instructions.setAttribute("style", "display:none");
    startBtn.setAttribute("style", "display:none");
    questionsDiv.setAttribute("style", "display:block");
    var timer = document.createElement("p");
    setTimer.appendChild(timer)
    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " Seconds Left";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            location.reload();
        }
    }, 1000);
}

startBtn.addEventListener("click", function() { 
    setTime();
    displayQuestion();
});