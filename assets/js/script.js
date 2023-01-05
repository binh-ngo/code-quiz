var startBtn = document.querySelector("#start")
var insDiv = document.querySelector("#greeting")
var quizDiv = document.querySelector("#quiz")
var leaderboardDiv = document.querySelector("#leaderboard")
var questionEl = document.querySelector("#question")
var answersEl = document.querySelector("#answers")
var isCorrectEl = document.querySelector("#is-correct")
var timerEl = document.querySelector("#timer");


var currentQuestion = 0;
var shuffled = "";
//creates an empty array and while the array has something inside, randomizes the next element and as you go through the elements, stores them into the result array which will be your randomized/shuffled array
function shuffle(array) {
    var result = [];
    var arrayCopy = [...array];         
    while(arrayCopy.length) {
        result.push(arrayCopy.splice(Math.floor(Math.random()*arrayCopy.length),1)[0])
    }
    return result;
}

var timeLeft = 0;
var countdown = 0;
// hides instruction/greeting page and makes the quiz div visible. Shuffled questions, instated a 120 sec time limit, and made sure the window displays the amount of time remaining as it counts down. If time reaches 0, endQuiz function is called, otherwise loadNextQuestion function is called.
function startQuiz() {
    insDiv.setAttribute("class","hide");
    quizDiv.setAttribute("class","")
    shuffled = shuffle(questions)
    timeLeft = 150;
    timerEl.textContent = `${timeLeft} second(s) remaining!`;
    countdown = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `${timeLeft} second(s) remaining!`;
        if(timeLeft <= 0) {
            timeLeft = 0;
            endQuiz();
        }
    },1000)
    loadNextQuestion();
}

// after a question is answered, hide window that shows if it was correct or not, then show the next set of question and answers .
function loadNextQuestion() {
    isCorrectEl.setAttribute("class","hide");
    answersEl.setAttribute("class","");
    questionEl.setAttribute("class","");
    console.log(shuffled[currentQuestion]);
    // make sure that as each question is shuffled, the answers for that question are shuffled as well 
    var shuffledAns = shuffle(shuffled[currentQuestion].answers);
    answersEl.innerHTML = "";
    questionEl.textContent = shuffled[currentQuestion].question;
    // each answer tile is treated as a button. Using a ternary operator, if the answer is the correct answer for the question, set that tile attribute = correct, else null.
    shuffledAns.forEach(answer => {
        var tile = document.createElement("button");
        tile.textContent = answer;
        answer === shuffled[currentQuestion].correctAnswer ? tile.setAttribute("data-correct","yes") : null;
        answersEl.append(tile);
    })
}
// if user answers question correctly, display "correct" message and hide the answered question. Cycle through all the questions. Once you reach the last question, start endquiz function.
function correctGuess() {
    isCorrectEl.textContent = "👍";
    isCorrectEl.setAttribute("class","correct");
    answersEl.setAttribute("class","hide");
    questionEl.setAttribute("class","hide");
    currentQuestion++;
    if(currentQuestion<shuffled.length){
        setTimeout(loadNextQuestion,500);
    } else {
        endQuiz();
    }
}

// if user answers question incorrectly, display "wrong" message and hide answered question, subtract time from timer and cycle through the questions until you reach the last one.
function wrongGuess() {
    isCorrectEl.textContent = "👎";
    isCorrectEl.setAttribute("class","wrong");
    answersEl.setAttribute("class","hide");
    questionEl.setAttribute("class","hide");
    currentQuestion++;
    timeLeft -= 12;
    if(currentQuestion < shuffled.length) {
        setTimeout(loadNextQuestion, 500);
    } else {
        endQuiz();
    }
}

//  clears countdown timer that was put into place by the setInterval method. Then hides the quiz window and makes the user able to record their score (time left) on the next window.
function endQuiz() {
    clearInterval(countdown);
    quizDiv.setAttribute("class", "hide");
    leaderboardDiv.setAttribute("class", "");
    timerEl.textContent = "";
    scoreEl.textContent = timeLeft;
}

// ternary operator that says if the user clicks on the correct answer button, run the correctGuess function, else run the wrongGuess function.
startBtn.addEventListener("click", startQuiz);
answersEl.addEventListener("click", function(event) {
    if(event.target.matches("button")) {
      event.target.getAttribute("data-correct") ? correctGuess() : wrongGuess();
    }
})