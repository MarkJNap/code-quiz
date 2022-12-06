// ------What do I need to have happen?------
const timerEl = document.getElementById("timer")
const startButtonEl = document.getElementById("start-button")
const startTextEl = document.getElementById("start-text")
const questionsContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")

// Put questions into here in an array? or have each question as a const to use...
const questions = "Quiz(Temp)"

// -----User needs to start the quiz
startButtonEl.addEventListener("click", startGame)

function startGame() {
    startButtonEl.classList.add("hide")
    startTextEl.classList.add("hide")
    questionsContainerEl.classList.remove("hide")
    timerStart()
    setQuestion()
}

// -----Quiz needs questions popualted
function setQuestion() {

}
// -----Timer needs to countdown
function timerStart() {
    var secondsLeft = 100;
    var timeInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        // console.log(secondsLeft);
    }, 1000)
}

// -----User needs to select an answer
function answerSelect() {
    
}
// -----Determine if it is correct or not and subtract time (10 seconds) if incorrect
// -----Display to user if right or wrong
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