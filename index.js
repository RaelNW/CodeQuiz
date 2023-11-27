
//Added variables for the elements in the HTML
const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const timeLeft = document.getElementById("timeLeft");
const timer = document.getElementById("timer");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const initialsInput = document.getElementById("initialsInput");

// Set the initial state of the game
let currentQuestionIndex = 0;
let timerInterval;
let score = 0;
let time = 60; // Set the initial time in seconds

const questions = [
    {
        question:
        "What is the HTML tag under which one can write the JavaScript code?",
        answers: ["<javascript>", "<scripted>", "<script>", "<js>"],
        correctAnswer: "<script>",
    },
    {
        question:
        "What is the HTML tag under which one can write the JavaScript code?",
        answers: ["<javascript>", "<scripted>", "<script>", "<js>"],
        correctAnswer: "<script>",
    },

    {
        question:
        "What is the correct syntax for referring to an external script called “geek.js”?",
        answers: [
        "<script src=”geek.js”>",
        "<script href=”geek.js”>",
        "<script ref=”geek.js”>",
        "<script name=”geek.js”>",
        ],
        correctAnswer: "<script src=”geek.js”>",
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
        "<!--This is a comment-->",
        "//This is a comment",
        "–This is a comment",
        "**This is a comment**",
        ],
        correctAnswer: "//This is a comment",
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
        "var colors = “red”, “green”, “blue”",
        "var colors = 1 = (“red”), 2 = (“green”), 3 = (“blue”)",
        "var colors = (1:”red”, 2:”green”, 3:”blue”)",
        "var colors = [“red”, “green”, “blue”]",
        ],
        correctAnswer: "var colors = [“red”, “green”, “blue”]",
    },
];
 //Added event listener to the start button
startBtn.addEventListener("click", startQuiz);

//function to start the Quiz
function startQuiz() {
  startBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  startTimer();
  showQuestion();
}
//function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeLeft.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}