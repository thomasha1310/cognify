const word = document.getElementById("word");
const progressBar = document.getElementById("progress-bar");

const colors = ["RED", "YELLOW", "BLUE", "GREEN", "PURPLE", "BLACK"];

var correct = 0;
var timeTakenOnCorrect = 0;
var timeOfLastWord = null;

var matchedOnCurrent = false;

var awardPointOnInterval = false;

var actualCorrect = 0;

function beginProcessing() {
  document.getElementById("before-test").hidden = true;
  document.getElementById("test").hidden = false;

  var count = 0;
  const totalWords = 10;
  const interval = setInterval(() => {
    document.getElementById("match-button").style.backgroundColor = "#8099e8";
    if (awardPointOnInterval) {
      correct++;
    }
    awardPointOnInterval = true;
    matchedOnCurrent = false;
    count++;
    if (count > totalWords) {
      clearInterval(interval);
      // Send data to backend
      alert(
        `Accuracy: ${(correct * 100) / totalWords}%\nAverage time on correct: ${
          Math.floor(timeTakenOnCorrect / correct) / 1000
        } seconds`
      );
      window.location.href = "results.html";
      return;
    }
    var progress = count / totalWords;
    progressBar.style.width = `${progress * 100}%`;
    const style = getWordStyle();
    word.innerText = style.text;
    word.style.color = style.color;
    timeOfLastWord = new Date();
  }, 1000);
}

function colorsMatch() {
  return word.innerText.toUpperCase() === word.style.color.toUpperCase();
}

function match() {
  if (matchedOnCurrent) {
    return;
  }
  matchedOnCurrent = true;
  if (colorsMatch()) {
    awardPointOnInterval = true;
    timeTakenOnCorrect += new Date() - timeOfLastWord;
  } else {
    awardPointOnInterval = false;
  }
  document.getElementById("match-button").style.backgroundColor = "#bed4ff";
}

function getWordStyle() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  if (Math.random() < 0.3) {
    actualCorrect++;
    awardPointOnInterval = false;
    return { color: color, text: color };
  } else {
    const text = colors[Math.floor(Math.random() * colors.length)];
    if (color == text) {
      actualCorrect++;
      awardPointOnInterval = false;
    }
    return { color: color, text: text };
  }
}
