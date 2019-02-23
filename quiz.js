// select all elements, we will need ti update the inner HTML of our elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var audio = new Audio("mp3/03 Kiss the Girl.mp3");
/* create our questions inside of a Array, every question will be an object and these object will have the same properties. 
Let question = a Array Question, img related to the question, choice A B or C, finaly the correct Answer*/
let questions = [
  {
    question: "What does Ursula want from Ariel?",
    imgSrc: "/img/Ursula.jpg",
    choiceA: "Her voice",
    choiceB: "Her soul",
    choiceC: "Her eyes",
    correct: "A"
  },
  {
    /*First question as an index of 0,
     */
    question: "What do the city guards call Aladdin?",
    imgSrc: "img/Aladdin.jpg",
    choiceA: "Filthy rat",
    choiceB: "Filthy criminal",
    choiceC: "Street rat",
    correct: "C"
  },
  {
    question: "What helps the medicine go down?",
    imgSrc: "img/marypoppins.jpg",
    choiceA: "A spoonful of sugar",
    choiceB: "A taste of honey",
    choiceC: "Cherry flavour",
    correct: "A"
  },
  {
    question: "What's the name of Jasmine's tiger?",
    imgSrc: "img/jasmine_rajah.gif",
    choiceA: "Bagheera",
    choiceB: "Desmond",
    choiceC: "Rajah",
    correct: "C"
  },
  {
    question: "What does Scar want the hyenas to be?",
    imgSrc: "img/scar-and-the-hyenas.jpg",
    choiceA: "Prepared",
    choiceB: "Strong",
    choiceC: "Ready",
    correct: "A"
  },
  {
    question:
      "What is the only thing the Cave of Wonders says Aladdin can touch?",
    imgSrc: "img/CaveofWonders.jpg",
    choiceA: "The diamond",
    choiceB: "The Genie",
    choiceC: "The lamp",
    correct: "C"
  },
  {
    question: "What does King Louie want from Mowgli?",
    imgSrc: "img/Thejunglebook.jpg",
    choiceA: "His service",
    choiceB: "Fire",
    choiceC: "Food",
    correct: "B"
  },
  {
    question: "Where is Lilo and Stitch set?",
    imgSrc: "img/LiloStitch.jpg",
    choiceA: "Caribbean",
    choiceB: "Hawaii",
    choiceC: "Dominican Republic",
    correct: "B"
  },
  {
    question: "How does Hades best express himself?",
    imgSrc: "img/hades.jpg",
    choiceA: "His words",
    choiceB: "His fire",
    choiceC: "His action",
    correct: "B"
  },
  {
    question: "What type of fish is Nemo?",
    imgSrc: "img/Nemo.jpg",
    choiceA: "Clown Fish",
    choiceB: "Flounder",
    choiceC: "Ghost Fish",
    correct: "A"
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "<p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);
// start quiz
function startQuiz() {
  audio.play();
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); //1000ms =1s
}
// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// check Anwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  //calculte the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the gif based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "img/80.gif"
      : scorePerCent >= 60
      ? "img/60 (2).gif"
      : scorePerCent >= 40
      ? "img/40.gif"
      : scorePerCent >= 20
      ? "img/20.gif"
      : "img/60.gif";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%<p>";
}

// starting the quiz we have a start Button
/* every question have 10sec to answer if the question
is not answered in the time we move to the next question
(automatically) and then restart the counter*/

// if your answer was correct we turn the
