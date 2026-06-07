document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    { emoji: "🐟", name: "Con Cá", benefit: "Làm thức ăn" },
    { emoji: "🐔", name: "Con Gà", benefit: "Làm thức ăn" },
    { emoji: "🐷", name: "Con Lợn", benefit: "Làm thức ăn" },
    { emoji: "🐃", name: "Con Trâu", benefit: "Sức kéo" },
    { emoji: "🐄", name: "Con Bò", benefit: "Sức kéo" },
    { emoji: "🐴", name: "Con Ngựa", benefit: "Sức kéo" },
    { emoji: "🐱", name: "Con Mèo", benefit: "Bắt chuột" },
    { emoji: "🐶", name: "Con Chó", benefit: "Giữ nhà" },
    { emoji: "🐦", name: "Con Chim", benefit: "Làm cảnh" },
    { emoji: "🐟", name: "Cá cảnh", benefit: "Làm cảnh" }
  ];

  const allBenefits = ["Làm thức ăn", "Sức kéo", "Bắt chuột", "Giữ nhà", "Làm cảnh"];

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const scoreSpan = document.getElementById("score-count");
  const currentQSpan = document.getElementById("current-q");
  const totalQSpan = document.getElementById("total-q");
  const dotsContainer = document.getElementById("progress-dots");
  const animalEmoji = document.getElementById("animal-emoji");
  const animalName = document.getElementById("animal-name");
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
    animalEmoji.textContent = q.emoji;
    animalName.textContent = q.name;
    updateDots();

    // Show 4 random benefits including the correct one
    let otherBenefits = allBenefits.filter(b => b !== q.benefit);
    shuffle(otherBenefits);
    let options = [q.benefit, ...otherBenefits.slice(0, 3)];
    shuffle(options);

    options.forEach((opt) => {
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

    if (selected === q.benefit) {
      el.classList.add("btn-correct");
      feedback.textContent = "Chính xác! Con vật này có ích cho con người.";
      feedback.className = "feedback correct-fb";
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();
      score++;
      scoreSpan.textContent = score;
    } else {
      el.classList.add("btn-wrong");
      allOpts.forEach((o) => {
        if (o.textContent === q.benefit) o.classList.add("btn-correct");
      });
      feedback.textContent = "Con hãy suy nghĩ lại xem con vật này giúp ích gì nhé.";
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

  shuffle(quizData);

  nextBtn.addEventListener("click", handleNext);
  restartBtn.addEventListener("click", restartGame);

  totalQSpan.textContent = quizData.length;
  initDots();
  loadQuestion();
});
