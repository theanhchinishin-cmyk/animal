document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      name: "Con Kiến",
      img: "ant.jpg",
      traits: [
        { label: "Kích thước", correct: "nhỏ", options: ["to", "nhỏ", "vừa"] },
        { label: "Chiều cao", correct: "thấp", options: ["cao", "thấp"] },
        {
          label: "Màu sắc",
          correct: "màu đen",
          options: ["màu đen", "màu nâu/vàng", "màu trắng"]
        },
        {
          label: "Chân",
          correct: "nhiều chân",
          options: ["hai chân", "bốn chân", "nhiều chân"]
        }
      ]
    },
    {
      name: "Con Bò",
      img: "cow.jpg",
      emoji: null,
      traits: [
        { label: "Kích thước", correct: "to", options: ["to", "nhỏ", "vừa"] },
        { label: "Chiều cao", correct: "cao", options: ["cao", "thấp"] },
        {
          label: "Màu sắc",
          correct: "màu nâu/vàng",
          options: ["màu đen", "màu nâu/vàng", "màu trắng"]
        },
        {
          label: "Chân",
          correct: "bốn chân",
          options: ["hai chân", "bốn chân", "nhiều chân"]
        }
      ]
    },
    {
      name: "Con Vịt",
      img: "duck.jpg",
      emoji: null,
      traits: [
        { label: "Kích thước", correct: "vừa", options: ["to", "nhỏ", "vừa"] },
        { label: "Chiều cao", correct: "thấp", options: ["cao", "thấp"] },
        {
          label: "Màu sắc",
          correct: "màu trắng",
          options: ["màu đen", "màu nâu/vàng", "màu trắng"]
        },
        {
          label: "Đặc điểm",
          correct: "có mỏ",
          options: ["có mỏ", "có vòi", "có sừng"]
        }
      ]
    }
  ];

  let currentIdx = 0;
  let stickerCollected = 0;
  let selections = {};
  let checked = false;

  const progressBar = document.getElementById("progress-bar");
  const animalDisplay = document.getElementById("animal-display");
  const animalTitle = document.getElementById("animal-title");
  const traitsContainer = document.getElementById("traits-container");
  const checkBtn = document.getElementById("check-btn");
  const feedbackBox = document.getElementById("feedback-box");
  const nextBtn = document.getElementById("next-btn");
  const stickerCount = document.getElementById("sticker-count");
  const finishModal = document.getElementById("finish-modal");
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

  function initProgress() {
    progressBar.innerHTML = "";
    quizData.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      progressBar.appendChild(dot);
    });
  }

  function updateProgress() {
    const dots = progressBar.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.remove("active", "completed");
      if (i < currentIdx) dot.classList.add("completed");
      if (i === currentIdx) dot.classList.add("active");
    });
  }

  function loadQuestion() {
    selections = {};
    checked = false;
    feedbackBox.classList.add("hidden");
    nextBtn.classList.add("hidden");
    checkBtn.classList.remove("hidden");
    traitsContainer.innerHTML = "";
    animalDisplay.innerHTML = "";

    const q = quizData[currentIdx];
    updateProgress();
    animalTitle.textContent = q.name;

    if (q.img) {
      const img = document.createElement("img");
      img.src = "/images/" + q.img;
      img.alt = q.name;
      animalDisplay.appendChild(img);
    } else if (q.emoji) {
      const span = document.createElement("span");
      span.className = "big-emoji";
      span.textContent = q.emoji;
      animalDisplay.appendChild(span);
    }

    q.traits.forEach((trait, tIdx) => {
      const row = document.createElement("div");
      row.className = "trait-row";

      const label = document.createElement("span");
      label.className = "trait-label";
      label.textContent = trait.label + ":";
      row.appendChild(label);

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "trait-options";
      optionsDiv.dataset.traitIdx = tIdx;

      const shuffledOpts = shuffle([...trait.options]);
      shuffledOpts.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "trait-btn";
        btn.textContent = opt;
        btn.dataset.value = opt;
        btn.addEventListener("click", () => {
          if (checked) return;
          optionsDiv
            .querySelectorAll(".trait-btn")
            .forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          selections[tIdx] = opt;
        });
        optionsDiv.appendChild(btn);
      });

      row.appendChild(optionsDiv);
      traitsContainer.appendChild(row);
    });
  }

  function checkAnswer() {
    const q = quizData[currentIdx];
    const totalTraits = q.traits.length;
    const selectedCount = Object.keys(selections).length;

    if (selectedCount < totalTraits) {
      feedbackBox.textContent = "Con hãy chọn đặc điểm cho tất cả các mục nhé!";
      feedbackBox.className = "feedback-box wrong-fb";
      feedbackBox.classList.remove("hidden");
      return;
    }

    checked = true;
    let correctCount = 0;

    const rows = traitsContainer.querySelectorAll(".trait-row");
    rows.forEach((row, tIdx) => {
      const btns = row.querySelectorAll(".trait-btn");
      btns.forEach((btn) => {
        btn.classList.add("disabled");
        if (btn.dataset.value === q.traits[tIdx].correct) {
          btn.classList.add("correct-show");
        }
        if (
          btn.classList.contains("selected") &&
          btn.dataset.value !== q.traits[tIdx].correct
        ) {
          btn.classList.add("wrong-show");
        }
      });
      if (selections[tIdx] === q.traits[tIdx].correct) {
        correctCount++;
      }
    });

    if (correctCount === totalTraits) {
      feedbackBox.textContent =
        "Rất tốt! Con đã quan sát và mô tả được đặc điểm của con vật.";
      feedbackBox.className = "feedback-box correct-fb";
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();

      stickerCollected++;
      stickerCount.textContent = stickerCollected;
    } else {
      feedbackBox.textContent =
        "Con hãy xem lại và quan sát kỹ hơn về màu sắc, kích thước hoặc đặc điểm của con vật nhé.";
      feedbackBox.className = "feedback-box wrong-fb";
      sfxWrong.currentTime = 0;
      sfxWrong.play();
    }

    feedbackBox.classList.remove("hidden");
    checkBtn.classList.add("hidden");

    nextBtn.classList.remove("hidden");
    nextBtn.textContent =
      currentIdx < quizData.length - 1 ? "Câu tiếp theo ➡️" : "Xem kết quả 🎉";
  }

  function handleNext() {
    currentIdx++;
    if (currentIdx < quizData.length) {
      loadQuestion();
    } else {
      finishModal.classList.add("active");
    }
  }

  function restartGame() {
    currentIdx = 0;
    stickerCollected = 0;
    stickerCount.textContent = "0";
    finishModal.classList.remove("active");
    shuffle(quizData);
    initProgress();
    loadQuestion();
  }

  shuffle(quizData);

  checkBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", handleNext);
  restartBtn.addEventListener("click", restartGame);

  initProgress();
  loadQuestion();
});
