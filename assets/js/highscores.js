// gets the string value of currentScores that was set in script.js, then makes sure that "scores" value is a string so that it can be parsed. 
var scores = JSON.parse(localStorage.getItem("scores")) || [];
// creates a new variable that will become a list element and appends every new score to the leaderboard
scores.forEach(score => {
    var newScore = document.createElement("li");
    newScore.textContent = `${score.initials} : ${score.score}`;
    document.querySelector("ol").append(newScore);
});