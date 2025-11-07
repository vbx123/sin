import { createTimer, showFinalResults } from './utils.js';

let questions = [];
let currentQuestion = 0;
let correctCount = 0;
let wrongCount = 0;
let totalTime = 0;

const timerElement = document.getElementById('timer');
let timer = null;

// 🧠 تحميل الأسئلة من JSON
fetch('data/countries.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    startQuiz();
  })
  .catch(err => {
    document.getElementById('quiz-container').innerHTML = `<p>حدث خطأ في تحميل الأسئلة ⚠️</p>`;
    console.error(err);
  });

// 🚀 بدء الاختبار
function startQuiz() {
  currentQuestion = 0;
  correctCount = 0;
  wrongCount = 0;
  totalTime = 0;

  timer = createTimer(
    20,
    updateTimer,
    endQuiz
  );

  showQuestion();
  timer.start();
}

function updateTimer(time) {
  timerElement.textContent = `⏰ ${time} ثانية`;
  totalTime++;
}

// 📝 عرض سؤال
function showQuestion() {
  const q = questions[currentQuestion];
  const qArea = document.getElementById('question-area');
  const oArea = document.getElementById('options-area');

  qArea.innerHTML = `<h2>${q.question}</h2>`;
  oArea.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === q.answer);
    oArea.appendChild(btn);
  });
}

// ✅ / ❌ التعامل مع الإجابة
function handleAnswer(isCorrect) {
  if (isCorrect) {
    correctCount++;
    timer.add(5);
  } else {
    wrongCount++;
    timer.subtract(2);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// 🏁 نهاية الاختبار
function endQuiz() {
  timer.stop();
  showFinalResults(correctCount, wrongCount, totalTime);
}
