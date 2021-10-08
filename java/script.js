
var giveDirections = document.getElementById("directions");
var opEl = document.getElementById("options")
var scoreEl = document.getElementById("score");
var lastEl = document.getElementById("final");
var doneEl = document.getElementById("end");
var questEl = document.getElementById("questions")
var questionHereEl = document.getElementById("questionHere");
var countEl = document.getElementById("count");
var startQuizEl = document.getElementById("startQuiz");
var resultsEl = document.getElementById("results");
var scoreBoardEl = document.getElementById("scoreBoard");
var initialsEl = document.getElementById("initials");
var leaderBoardEl = document.getElementById("leaderBoard");
var endbuttonsEl = document.getElementById("endButtons");
var enterEl = document.getElementById("enter");
var leaderScoreEl = document.getElementById("leaderScore");
var alpha = document.getElementById("a");
var beta = document.getElementById("b");
var charlie = document.getElementById("c");
var delta = document.getElementById("d");
var clearEl = document.getElementById("clear")

var askQuestions = [
     {
         question: "What does DOM  mean?",
         pickA: "Document Object Model",
         pickB: "Dominant Object Model",
         pickC: "Deisel Operated Motor",
         pickD: "Due On Monday",
         answer: "a"
     },
     {
         question: "What is JavaScript?",
         pickA: "The sacred Nerd text",
         pickB: "Computer styling",
         pickC: "Programming language",
         pickD: "Website event listeners",
         answer: "c"
     },
     {
         question: "What is scope?",
         pickA: "The size of blocks in code",
         pickB: "accessibility (visibility) of variables",
         pickC: "Mouthwash",
         pickD: "Declaration of variables",
         answer: "b"
     },
     {
         question: "What's the purpose of a function?",
         pickA: "To define a block of code",
         pickB: "To make the computer boot up",
         pickC: "A set of statements that performs a task or calculates a value",
         pickD: "A & C",
         answer: "d"
     },
     {
         question: "What are examples of event listeners?",
         pickA: "Boot up",
         pickB: "Drive",
         pickC: "Cookies",
         pickD: "Click",
         answer: "d"
     },
     {
         question: "How are Javascript files saved?",
         pickA: ".css",
         pickB: ".html",
         pickC: ".js",
         pickD: ".png",
         answer: "c"
     }
  
 ];

var allQuestions = askQuestions.length;
var currentOne = 0;
var timeOnClock = 46;
var score = 0;
var correct;
var interval;

opEl.style.display = "none";
doneEl.style.display = "none";
resultsEl.style.display = "none";
endbuttonsEl.style.display = "none";

function getQuestions() {

    doneEl.style.display = "none";


    if (currentOne === allQuestions) {
        return showResults();
    }
    var firstOne = askQuestions[currentOne];
    questionHereEl.innerHTML = "<p>" + firstOne.question + "</p>";
    alpha.innerHTML = firstOne.pickA;
    beta.innerHTML = firstOne.pickB;
    charlie.innerHTML = firstOne.pickC;
    delta.innerHTML = firstOne.pickD;
};

function showQuestions() {
    doneEl.style.display = "none";
    giveDirections.style.display = "none";

    getQuestions();

    interval = setInterval(function () {
        timeOnClock--;
        countEl.textContent = "Time:" + timeOnClock;

        if (timeOnClock === 0) {
            clearInterval(interval);
            showResults();
        }
    }, 1000);
    opEl.style.display = "block";

}

function showResults() {
    opEl.style.display = "none";
    doneEl.style.display = "flex";
    clearInterval(interval);
    initialsEl.value = "";
    lastEl.innerHTML = "You got " + score + " out of 6 correct!";
}

enterEl.addEventListener("click", function highscore() {

    if (initialsEl.value === "") {
        alert("Enter your initials");
        return false;
    } else {
        var savedScore = JSON.parse(localStorage.getItem("savedScore")) || [];
        var currentId = initialsEl.value.trim();
        var currentHigh = {
            name: currentId,
            score: score
        };

        doneEl.style.display = "none";
        resultsEl.style.display = "flex";
        scoreBoardEl.style.display = "block";
        endbuttonsEl.style.display = "flex";

        savedScore.push(currentHigh);
        localStorage.setItem("savedScore", JSON.stringify(savedScore));
        generateHigh();
    }
});

function generateHigh() {
    leaderBoardEl.innerHTML = "";
    leaderScoreEl.innerHTML = "";

    var highScores = JSON.parse(localStorage.getItem("savedScore")) || {};

    for (i = 0; i < highScores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highScores[i].name;
        newScore.textContent = highScores[i].score;
        leaderBoardEl.appendChild(newName);
        leaderScoreEl.appendChild(newScore);
    }
}

function showHigh() {
    giveDirections.style.display = "none"
    doneEl.style.display = "none";
    resultsEl.style.display = "flex";
    scoreBoardEl.style.display = "block";
    endbuttonsEl.style.display = "flex";

    generateHigh();
}

function clearData() {
    window.localStorage.clear();
    leaderBoardEl.textContent = "";
    leaderScoreEl.textContent = "";
}

function repeatQuiz() {
    resultsEl.style.display = "none";
    doneEl.style.display = "none";
    endbuttonsEl.style.display = "none";
    giveDirections.style.display = "block";

    timeOnClock = 46;
    score = 0;
    currentOne = 0;
}


function gradeAnswer(answer) {
    correct = askQuestions[currentOne].answer;

    if (answer === correct && currentOne !== allQuestions) {
        score++;

        alert("Correct");
        currentOne++;
        getQuestions();

    } else if (answer !== correct && currentOne !== allQuestions) {
        alert("Incorrect");
        currentOne++;
        getQuestions();
    } else {
        showResults();
    }
}




startQuizEl.addEventListener("click", showQuestions);