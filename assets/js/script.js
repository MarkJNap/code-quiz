const timerEl = document.getElementById("timer")
const startButtonEl = document.getElementById("start-button")
const startContainerEl = document.getElementById("start-info")
const questionsContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
const selectedAnswerEl = document.getElementById("answer-display")
const endingContainerEl = document.getElementById("endgame-info")
const highscoreContainerEl = document.getElementById("highscore-info")
const highscoretextEl = document.getElementById("highscore")
const submitButtonEl = document.getElementById("submit-score-button")
const highscoreListEl = document.getElementById("listed-highscores")
const retryButtonEl = document.getElementById("retry-button")
const clearButtonEl = document.getElementById("clear-button")
const highscoreLinkEL = document.getElementById("highscores-link")

const questionsAll = [
    {
        question: "In JavaScript, What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        answers: [
            { text: "Else", correct: false},
            { text: "While", correct: true},
            { text: "For", correct: false},
            { text: "Conditional", correct: false}
        ]
    },    
    {
        question: "What HTML element is a container for elements that may include the document title, scripts, styles, meta information, and more?",
        answers: [
            { text: "<head>", correct: true},
            { text: "<title>", correct: false},
            { text: "<a>", correct: false},
            { text: "<header>", correct: false}
        ]
    },  
    {
        question: "In JavaScript, what element is used to store and manipulate text?",
        answers: [
            { text: "Variables", correct: false},
            { text: "Booleans", correct: false},
            { text: "Strings", correct: true},
            { text: "Methods", correct: false}
        ]
    },   
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Home Tool Markup Language", correct: false},
            { text: "Hyperlinks and Text Markup Language", correct: false},
            { text: "Hyper Tools and Making Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true}
        ]
    },    
    {
        question: "What is the box called in CSS that wraps around every HTML element?",
        answers: [
            { text: "Box-model", correct: true},
            { text: "Float", correct: false},
            { text: "Wrap", correct: false},
            { text: "Boundary", correct: false}
        ]
    },    
    {
        question: "How do you display a border like this: <br> The top border = 10 pixels, <br>The bottom border = 5 pixels, <br>The left border = 20 pixels, <br>The right border = 2 pixels?",
        answers: [
            { text: "border-width:10px 2px 5px 20px;", correct: true},
            { text: "border-width:5px 20px 10px 2px;", correct: false},
            { text: "border-width:10px 20px 5px 2px;", correct: false},
            { text: "border-width:10px 5px 20px 2px;", correct: false}
        ]
    }
]
let currentQuestion = 0;
let secondsLeft = 100;
let scoreTimer = 0;
let timerId = null;
let stored = []


// Starts the quiz when clicked
startButtonEl.addEventListener("click", startGame)
// User clicks the highscore link and takes them to highscore page
highscoreLinkEL.addEventListener("click", highscoreScreen)

// Beginning function of the game
function startGame() {
    startContainerEl.classList.add("hide")
    selectedAnswerEl.classList.add("hide")
    highscoreContainerEl.classList.add("hide")
    questionsContainerEl.classList.remove("hide")
    timerStart()
    setQuestion()
}

// Timer begins countdown
function timerStart() {
    timerId = setInterval(function () {
        secondsLeft--;
        if ((secondsLeft <= 0) || (currentQuestion === questionsAll.length)) {
            timerEl.textContent = "Time is Up!"
            score()
            endGame() 
        }
        setTimerText();
    }, 1000)
}
// Displays the current timer time
function setTimerText() {
    timerEl.textContent = "Time: " + secondsLeft;
}
// Stops the timer and stops the functions
function stopTimer() {
    clearInterval(timerId)
}
// Keeps track of the players score
function score() {
    scoreTimer = secondsLeft
    if (scoreTimer < 0) {
        scoreTimer = 0
    }
}

// Populates the Quiz with a question
function setQuestion() {
    blankSlate()
    showQuestion(questionsAll[currentQuestion])
}

// Removes existing answers to not clash with new answers buttons
function blankSlate() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}
// Displays the question and creates the answer buttons
function showQuestion(questionsAll) {
    questionEl.innerHTML = questionsAll.question
    questionsAll.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        // Sets the correct answer
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", answerSelect)
        answerButtonsEl.appendChild(button)
    })
}

// When user selects an answer
function answerSelect(e) {
    let selectedAnswer = e.target
// Determine if it is correct or not and subtract time (20 seconds) if incorrect
// Display to user if right or wrong
    if (selectedAnswer.dataset.correct) {
        selectedAnswerEl.textContent = "Correct!"
        selectedAnswerEl.classList.remove("hide")
    } else {
        selectedAnswerEl.textContent = "Wrong!"
        selectedAnswerEl.classList.remove("hide")
        secondsLeft = secondsLeft - 20
    }
    nextQuestion()
}


// Moves on to the next question or heads to ending gamescreen
function nextQuestion () {
    currentQuestion++
    if (currentQuestion === questionsAll.length) {
        score()
        endGame()
    } else {
    setQuestion()
    }
}
// -----When the quiz is finished or time runs out, end the quiz and display the time as the score
function endGame() {
    stopTimer()
    clearAll()
    endingContainerEl.classList.remove("hide")
    highscoretextEl.textContent = "Your Score was: " + scoreTimer + "!"
// -----Let users input their initials to track on highscores
    submitButtonEl.addEventListener("click", highscoreScreen)
}
// Clears away question and start containers
function clearAll() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
    questionEl.classList.add("hide")
    selectedAnswerEl.classList.add("hide")
    startContainerEl.classList.add("hide")
}

// -----Display highscores with retry quiz and clear highscore options
function highscoreScreen() {
    saveHighscore();
    // storedHighscore()
    clearAll();
    stopTimer()
    displayUserScore();
    startContainerEl.classList.add("hide")
    selectedAnswerEl.classList.add("hide")
    endingContainerEl.classList.add("hide")
    highscoreContainerEl.classList.remove("hide")
    retryButtonEl.addEventListener("click", restartGame)
    clearButtonEl.addEventListener("click", clearHighscore)
}

function saveHighscore() {
    let userInitial = document.getElementById("initials").value;
    let userScore = {
        initial: userInitial,
        highscore: scoreTimer
    };
    localStorage.setItem("userscore", JSON.stringify(userScore))
    // console.log(localStorage);
}

// TODO Finish sorting (Didn't finish in time)
// function storedHighscore() {
//     let userHighscore = JSON.parse(localStorage.getItem("userscore"))
//     stored.push(userHighscore)
//     let sortedHighscores = stored.sort((h1, h2) => (h1.highscore < h2.highscore) ? 1 : (h1.highscore > h2.highscore) ? -1 : 0);
//     console.log(sortedHighscores);
// }


// From the array creates a list item to display inital and score
function displayUserScore() {
    let userHighscore = JSON.parse(localStorage.getItem("userscore"))
    let liScore = document.createElement("li")
    if (userHighscore.initial !== "") {
        liScore.textContent = userHighscore.initial + " - " + userHighscore.highscore
        highscoreListEl.appendChild(liScore)
    }
}
// Clears all highscores
function clearHighscore() {
    while (highscoreListEl.firstChild) {
        highscoreListEl.removeChild(highscoreListEl.firstChild)
    }
    // stored = []
}

// From highscore display can retry the quiz
function restartGame() {
    currentQuestion = 0;
    secondsLeft = 100;
    scoreTimer = 0;
    timerId = null;
    localStorage.clear()
    // console.log(localStorage);
    questionEl.classList.remove("hide")
    startGame()
}






















// ------------Questions for Quiz----------------
// Q1. In JavaScript, What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?
// A1. Else, While (Correct), For, Conditional

// Q2. What HTML element is a container for elements that may include the document title, scripts, styles, meta information, and more?
// A2. <head> (Correct) , <title> , <a> , <header>

// Q3. In JavaScript, what element is used to store and manipulate text?
// A3. Variables, Booleans, Strings (Correct), Methods

// Q4. What does HTML stand for?
// A4. Home Tool Markup Language, Hyperlinks and Text Markup Language, Hyper Tools and Making Language, Hyper Text Markup Language (Correct)

// Q5. What is the box called in CSS that wraps around every HTML element?
// A5. Box-model (Correct), Float, Wrap, Boundary

// Q6. How do you display a border like with: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 2 pixels?
// A6. border-width:10px 2px 5px 20px; (Correct), border-width:5px 20px 10px 2px;, border-width:10px 20px 5px 2px;, border-width:10px 5px 20px 2px;