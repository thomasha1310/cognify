let Questions = [];
const ques = document.getElementById("ques")

async function fetchQuestions() {
    try {
        const response = await
         fetch('wm_list.json');
        if (!response.ok) {
            throw new Error(`error bozo :(`);
        }
        const data = await response.json();
        Questions = data.results;
        shuffleQues(Questions);
        loadQues();
    }
    catch (error) {
        console.log(error);
        ques.innerHTML = `<h5 style='color: red'>
        ${error}</h5>`;
    }  
}
fetchQuestions();

function shuffleQues(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let currQuestion = 0
let score = 0

function loadQues() {
    if (Questions.length === 0) {
        ques.innerHTML = `<h5>loading questions...</h5>`
    }
    let currentQuestion = Questions[currQuestion].question
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");

    ques.innerText = currentQuestion;
    opt.innerHTML = "";

    const correctAnswer = Questions[currQuestion].correct_answer;
    const incorrectAnswers = Questions[currQuestion].incorrect_answers;
    const options = ["YES", "NO"];

    options.forEach(option => {
        option = option.replace(/&quot;/g, '"').replace(/&apos;/g, "'");

        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = option;
        choiceLabel.textContent = option;

        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    });
}

function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.textContent = `your score was ${score} out 
    of ${Questions.length}`;
    totalScore.innerHTML += "<h3>all answers:</h3>"
    Questions.forEach((el, index) => {
        totalScore.innerHTML += `<p>${index + 1}.
         ${el.correct_answer}</p>`
    })
}


function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}

function checkAns() {
    const selectedAns = document.querySelector('input[name="answer"]:checked').value;

    if (selectedAns === Questions[currQuestion].correct_answer) {
        score++;
        }
    nextQuestion();
    }