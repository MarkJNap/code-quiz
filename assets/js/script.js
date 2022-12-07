const timerEl = document.getElementById("timer")
const startButtonEl = document.getElementById("start-button")
const startTextEl = document.getElementById("start-text")
const questionsContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
const selectedAnswerEl = document.getElementById("answer-display")
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
        question: "How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 2 pixels?",
        answers: [
            { text: "border-width:10px 2px 5px 20px;", correct: true},
            { text: "border-width:5px 20px 10px 2px;", correct: false},
            { text: "border-width:10px 20px 5px 2px;", correct: false},
            { text: "border-width:10px 5px 20px 2px;", correct: false}
        ]
    }
]
var currentQuestion = 0
var secondsLeft = 100;

// ------What do I need to have happen?------
// -----User clicks start the quiz
startButtonEl.addEventListener("click", startGame)

// -----What happens when the game starts
function startGame() {
    startButtonEl.classList.add("hide")
    startTextEl.classList.add("hide")
    selectedAnswerEl.classList.add("hide")
    questionsContainerEl.classList.remove("hide")
    timerStart()
    setQuestion()
}

// -----Timer begins countdown
function timerStart() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        if (Number(secondsLeft) < 0) {
            timerEl.textContent = "Time is Up!"
            return
        }
        setTimerText();
    }, 1000)
}

function setTimerText() {
    timerEl.textContent = "Time: " + secondsLeft;
}


// -----Quiz needs questions popualted
function setQuestion() {
    // Removes existing answers to not clash with new answers buttons
    blankSlate()
    showQuestion(questionsAll[currentQuestion])
}

function blankSlate() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)

    }
}

function showQuestion(questionsAll) {
    questionEl.innerHTML = questionsAll.question
    questionsAll.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", answerSelect)
        answerButtonsEl.appendChild(button)
    })
}

// -----User needs to select an answer
function answerSelect(e) {
    var selectedAnswer = e.target
    Array.from(answerButtonsEl.children).forEach(button => {
        setClass(button, button.dataset.correct)
    })

// -----Determine if it is correct or not and subtract time (10 seconds) if incorrect
// -----Display to user if right or wrong
    if (selectedAnswer.dataset.correct) {
        selectedAnswerEl.textContent = "Correct!"
        selectedAnswerEl.classList.remove("hide")
        score++
    } else {
        selectedAnswerEl.textContent = "Wrong!"
        selectedAnswerEl.classList.remove("hide")
        secondsLeft = secondsLeft - 10
    }
    nextQuestion()

}
// Moves on to the next question or heads to ending game
function nextQuestion () {
    currentQuestion++
    if (currentQuestion === questionsAll.length) {
        questionEl.classList.add("hide")
        blankSlate()
    } else {
    setQuestion()
    }
}

function setClass(element, correct) {
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

// -----When the quiz is finished or time runs out, end the quiz and display the time as the score
// -----Let users input their initials to track on highscores
// -----Display highscores with retry quiz and clear highscore options


















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