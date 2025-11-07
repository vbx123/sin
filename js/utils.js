// utils.js

// 🕒 إنشاء مؤقت ديناميكي
export function createTimer(startTime, onTick, onTimeUp) {
  let time = startTime;
  let timerId = null;

  function start() {
    timerId = setInterval(() => {
      time--;
      onTick(time);
      if (time <= 0) {
        stop();
        onTimeUp();
      }
    }, 1000);
  }

  function stop() {
    clearInterval(timerId);
  }

  function add(seconds) {
    time += seconds;
  }

  function subtract(seconds) {
    time = Math.max(0, time - seconds);
  }

  function getTime() {
    return time;
  }

  return { start, stop, add, subtract, getTime };
}

// 📊 عرض النتيجة النهائية
export function showFinalResults(correct, wrong, totalTime) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <div class="results">
      <h2>النتيجة النهائية 🏁</h2>
      <p>✅ صحيحة: <strong>${correct}</strong></p>
      <p>❌ خاطئة: <strong>${wrong}</strong></p>
      <p>⏰ الوقت المستهلك: <strong>${totalTime} ثانية</strong></p>
      <a href="index.html" class="back-btn">🏠 عودة للرئيسية</a>
    </div>
  `;
}
