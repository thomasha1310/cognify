const progressBar = document.getElementById("progress-bar");

var words = [];

var shown = [];

function beginMemory() {
  words = [
    "shorts",
    "arrange",
    "rung",
    "proposal",
    "process",
    "attraction",
    "oh",
    "praise",
    "youth",
    "cater",
    "rage",
    "guideline",
    "oven",
    "frank",
    "convention",
    "link",
    "finish",
    "sustain",
    "good",
    "thin",
    "winner",
    "fireplace",
    "designer",
    "admission",
    "test",
    "flood",
    "fine",
    "dragon",
    "ratio",
    "put",
    "undertake",
    "overlook",
    "trait",
    "peel",
    "confine",
    "vessel",
    "air",
    "revoke",
    "object",
    "composer",
    "president",
    "gem",
    "wine",
    "orbit",
    "similar",
    "nose",
    "butterfly",
    "foundation",
    "engineer",
    "effort",
  ];

  document.getElementById("before-test").hidden = true;
  document.getElementById("preview").hidden = false;

  beginPreview();
}

function beginPreview() {
  shuffle(words);
  let i = 0;
  const interval = setInterval(() => {
    document.getElementById("preview-word").style.color = "black";
    document.getElementById("preview-word").innerText = words[i];
    shown.push(words[i]);
    i++;
    if (i === 15) {
      clearInterval(interval);
      document.getElementById("preview").hidden = true;
      document.getElementById("test").hidden = false;
      beginTest();
    }
  }, 1000);
}

let i = 0;
let correct = 0;
let startTime = null;

function beginTest() {
  shuffle(words);
  i = 0;
  startTime = new Date();
  nextTestWord();
}

function nextTestWord() {
  var progress = i / words.length;
  progressBar.style.width = `${progress * 100}%`;
  if (i === words.length) {
    const endTime = new Date();
    const time = endTime - startTime;
    const accuracy = (correct * 100) / words.length;

    const results = {
      processing: {
        time: (endTime - startTime) / words.length / 1000,
        accuracy: (correct / words.length) * 100,
      },
    };
    sendToBackend(results).then(() => {
      window.location.href = "reaction.html";
    });
  }
  document.getElementById("word").style.color = "black";
  document.getElementById("word").innerText = words[i];
  i++;
}

function yes() {
  if (shown.includes(document.getElementById("word").innerText)) {
    correct++;
  }
  nextTestWord();
}

function no() {
  if (!shown.includes(document.getElementById("word").innerText)) {
    correct++;
  }
  nextTestWord();
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

async function sendToBackend(results) {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: 3,
        data: {
          data: results,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
