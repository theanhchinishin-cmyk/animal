document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      riddle: "Con gì tám cẳng hai càng?",
      keywords: ["cua"],
      display: "Con Cua",
      img: "crab.jpg"
    },
    {
      riddle: "Con gì cánh bay vo ve?",
      keywords: ["ong"],
      display: "Con Ong",
      img: "bee.jpg"
    },
    {
      riddle: "Con gì có vây và đuôi, sống dưới nước?",
      keywords: ["cá", "ca"],
      display: "Con Cá",
      img: "fish.jpg"
    }
  ];

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const scoreSpan = document.getElementById("score-count");
  const currentQSpan = document.getElementById("current-q");
  const totalQSpan = document.getElementById("total-q");
  const dotsContainer = document.getElementById("progress-dots");
  const riddleText = document.getElementById("riddle-text");
  const answerInput = document.getElementById("answer-input");
  const guessBtn = document.getElementById("guess-btn");
  const feedback = document.getElementById("feedback");
  const resultCard = document.getElementById("result-card");
  const resultEmoji = document.getElementById("result-emoji");
  const resultName = document.getElementById("result-name");
  const nextBtn = document.getElementById("next-btn");
  const victoryModal = document.getElementById("victory-modal");
  const restartBtn = document.getElementById("restart-btn");

  const sfxCorrect = new Audio("/sounds/ting.mp3");
  const sfxWrong = new Audio("/sounds/wrong.mp3");

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initDots() {
    dotsContainer.innerHTML = "";
    quizData.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.remove("active", "completed");
      if (i < currentIdx) dot.classList.add("completed");
      if (i === currentIdx) dot.classList.add("active");
    });
  }

  function loadQuestion() {
    answered = false;
    feedback.classList.add("hidden");
    resultCard.classList.add("hidden");
    answerInput.value = "";
    answerInput.classList.remove("shake-error");
    answerInput.disabled = false;
    guessBtn.disabled = false;

    const q = quizData[currentIdx];
    currentQSpan.textContent = currentIdx + 1;
    totalQSpan.textContent = quizData.length;
    riddleText.textContent = q.riddle;
    updateDots();

    answerInput.focus();
  }

  function checkAnswer() {
    if (answered) return;
    const userInput = answerInput.value.trim().toLowerCase();

    if (userInput === "") {
      answerInput.classList.add("shake-error");
      setTimeout(() => answerInput.classList.remove("shake-error"), 400);
      return;
    }

    const q = quizData[currentIdx];
    let isCorrect = false;

    for (let kw of q.keywords) {
      if (userInput.includes(kw)) {
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      answered = true;
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();

      score++;
      scoreSpan.textContent = score;

      answerInput.disabled = true;
      guessBtn.disabled = true;

      resultEmoji.src = "/images/" + q.img;
      resultEmoji.alt = q.name || q.display;
      resultName.textContent = q.display;

      feedback.classList.add("hidden");
      resultCard.classList.remove("hidden");
    } else {
      sfxWrong.currentTime = 0;
      sfxWrong.play();

      feedback.textContent = "Con hãy đọc lại câu đố và quan sát đặc điểm nhé.";
      feedback.className = "feedback wrong-fb";
      feedback.classList.remove("hidden");

      answerInput.classList.add("shake-error");
      setTimeout(() => answerInput.classList.remove("shake-error"), 400);
    }
  }

  function handleNext() {
    currentIdx++;
    if (currentIdx < quizData.length) {
      loadQuestion();
    } else {
      victoryModal.classList.add("active");
    }
  }

  function restartGame() {
    currentIdx = 0;
    score = 0;
    scoreSpan.textContent = "0";
    victoryModal.classList.remove("active");
    initDots();
    loadQuestion();
  }

  guessBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", handleNext);
  restartBtn.addEventListener("click", restartGame);

  answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !guessBtn.disabled) {
      checkAnswer();
    }
  });

  totalQSpan.textContent = quizData.length;
  initDots();
  loadQuestion();
});
