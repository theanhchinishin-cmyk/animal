document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      id: "cong",
      name: "Con Công",
      img: "peacock.jpg",
      part: "đuôi",
      question: "Bộ phận nào nổi bật nhất của con công?",
      options: ["đuôi", "mỏ", "cánh", "chân"]
    },
    {
      id: "huou",
      name: "Con Hươu",
      img: "deer.jpg",
      part: "chân",
      question: "Bộ phận nào giúp con hươu chạy nhanh?",
      options: ["chân", "sừng", "đuôi", "tai"]
    },
    {
      id: "ca",
      name: "Con Cá",
      img: "fish.jpg",
      part: "vây",
      question: "Bộ phận nào giúp con cá bơi?",
      options: ["vây", "đuôi", "mang", "mắt"]
    },
    {
      id: "cua",
      name: "Con Cua",
      img: "crab.jpg",
      part: "càng",
      question: "Bộ phận nào đặc biệt nhất của con cua?",
      options: ["càng", "chân", "mai", "mắt"]
    }
  ];

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const scoreSpan = document.getElementById("score-count");
  const currentQSpan = document.getElementById("current-q");
  const totalQSpan = document.getElementById("total-q");
  const dotsContainer = document.getElementById("progress-dots");
  const animalEmoji = document.getElementById("animal-emoji");
  const animalName = document.getElementById("animal-name");
  const questionText = document.getElementById("question-text");
  const optionsGrid = document.getElementById("options-grid");
  const feedback = document.getElementById("feedback");
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
    nextBtn.classList.add("hidden");
    optionsGrid.innerHTML = "";

    const q = quizData[currentIdx];
    currentQSpan.textContent = currentIdx + 1;
    totalQSpan.textContent = quizData.length;
    animalEmoji.src = "/images/" + q.img;
    animalEmoji.alt = q.name;
    animalName.textContent = q.name;
    questionText.textContent = q.question;
    updateDots();

    const shuffled = shuffle([...q.options]);
    shuffled.forEach((opt) => {
      const div = document.createElement("div");
      div.className = "option-item";
      div.textContent = opt;
      div.addEventListener("click", () => handleAnswer(opt, div));
      optionsGrid.appendChild(div);
    });
  }

  function handleAnswer(selected, el) {
    if (answered) return;
    const q = quizData[currentIdx];
    const allOpts = optionsGrid.querySelectorAll(".option-item");
    answered = true;

    allOpts.forEach((o) => o.classList.add("disabled"));

    if (selected === q.part) {
      el.classList.add("btn-correct");
      feedback.textContent = "Chính xác! Đây là bộ phận của con vật.";
      feedback.className = "feedback correct-fb";
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();
      score++;
      scoreSpan.textContent = score;
    } else {
      el.classList.add("btn-wrong");
      allOpts.forEach((o) => {
        if (o.textContent === q.part) o.classList.add("btn-correct");
      });
      feedback.textContent = "Con hãy quan sát lại hình nhé.";
      feedback.className = "feedback wrong-fb";
      sfxWrong.currentTime = 0;
      sfxWrong.play();
    }

    feedback.classList.remove("hidden");
    if (currentIdx < quizData.length - 1) {
      nextBtn.classList.remove("hidden");
      nextBtn.textContent = "Câu tiếp theo ➡️";
    } else {
      nextBtn.classList.remove("hidden");
      nextBtn.textContent = "Xem kết quả 🎉";
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

  nextBtn.addEventListener("click", handleNext);
  restartBtn.addEventListener("click", restartGame);

  totalQSpan.textContent = quizData.length;
  initDots();
  loadQuestion();
});
