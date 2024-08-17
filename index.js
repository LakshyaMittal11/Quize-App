const questions = [
  {
    question: "what is the largest animal in this world?",
    answers: [
      { text: "shark", correct: false },
      { text: "elephant", correct: false },
      { text: "lion", correct: false },
      { text: "blue whale", correct: true },
    ],
  },
  {
    question: "what is the largest desert in this world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: true },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "what is the largest continent in this world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: false },
      { text: "Arctic", correct: false },
      { text: "Russia", correct: true },
    ],
  },
  {
    question: "what is the largest continent in this world?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Australia", correct: false },
      { text: "Arctic", correct: false },
      { text: "Russia", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-btns");
const nextbtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
startQuiz();
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbtn.innerHTML = "NEXT";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " : " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// it remove privous btns
function resetState() {
  nextbtn.style.display = "none";
  while (answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerbtn.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled =true;
  })
  nextbtn.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextbtn.innerHTML="play Again";
    nextbtn.style.display= "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

