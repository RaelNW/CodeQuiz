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
const highScoresContainer = document.getElementById("highScoresSection");

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

//Function to show questions and append them to the HTML
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.classList.add("answerBtn");
    answerBtn.dataset.index = index;
    answerBtn.addEventListener("click", checkAnswer);
    answersContainer.appendChild(answerBtn);
  });
}

//Function to check answers and compare them to the correct answer
function checkAnswer(event) {
  const selectedAnswerIndex = parseInt(event.target.dataset.index);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswerIndex === currentQuestion.correctAnswer) {
    resultText.textContent = "Correct!";
    score += 10; // Increase score for a correct answer
  } else {
    time -= 10; // Deduct 10 seconds for an incorrect answer
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

//Function to end the Quiz
function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultText.textContent = `The quiz is over final score is ${score}`;
}

saveScoreBtn.addEventListener("click", saveScore);

// Function to display high scores
function displayHighScores() {
  highScoresContainer.classList.remove("hidden");
  const highScoresList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Clear the existing list before displaying new scores
  highScoresList.innerHTML = "";

  // Populate the high scores list
  highScores.forEach((scoreObj, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${scoreObj.initials} - ${
      scoreObj.score
    }`;
    highScoresList.appendChild(listItem);
  });
}

// Modify the saveScore function to call displayHighScores after saving the score
function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials === "") {
    alert("Please enter your initials");
    return;
  }
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = {
    score,
    initials,
  };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // After saving the score, display the updated high scores
  displayHighScores();
}
