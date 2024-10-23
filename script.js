const startBtn = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

// Quiz Questions (array of objects)
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 3
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Homer"],
        correct: 2
    }
];

// Start the Quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 60;
    startBtn.style.display = 'none';
    resultEl.textContent = '';
    updateScore();
    startTimer();
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choiceBtns.forEach((btn, index) => {
        btn.textContent = currentQuestion.choices[index];
        btn.onclick = () => checkAnswer(index + 1);
    });
}

// Check Answer
function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice === currentQuestion.correct) {
        score++;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong!";
    }
    updateScore();
    nextQuestion();
}

// Load Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            resultEl.textContent = '';
            loadQuestion();
        }, 1000);
    } else {
        endQuiz();
    }
}

// Update Score
function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
}

// Start Timer
function startTimer() {
    timerEl.textContent = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    resultEl.textContent = `Quiz Over! Final Score: ${score}`;
    startBtn.style.display = 'inline-block';
}
