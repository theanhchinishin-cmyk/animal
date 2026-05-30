document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    {
      clue: "Con vật này có 4 chân, có lông, sống trong nhà, hay vẫy đuôi khi vui. Là con gì nhỉ?",
      keywords: ["chó", "cho"],
      nameDisplay: "Con Chó 🐶",
      img: "dog.jpg"
    },
    {
      clue: "Con vật này không có chân, sống dưới nước, bơi rất giỏi. Là con gì nhỉ?",
      keywords: ["cá", "ca"],
      nameDisplay: "Con Cá 🐟",
      img: "fish.jpg"
    },
    {
      clue: "Con vật này có 2 cánh, biết bay, hót rất hay. Là con gì nhỉ?",
      keywords: ["chim"],
      nameDisplay: "Con Chim 🐦",
      img: "bird.jpg"
    },
    {
      clue: "Con vật này nhỏ nhắn, thích bắt chuột, suốt ngày kêu meo meo. Là con gì nhỉ?",
      keywords: ["mèo", "meo"],
      nameDisplay: "Con Mèo 🐱",
      img: "cat.jpg"
    },
    {
      clue: "Con vật này có đôi tai rất dài, đuôi ngắn, thích ăn cà rốt và nhảy tung tăng. Là con gì nhỉ?",
      keywords: ["thỏ", "tho"],
      nameDisplay: "Con Thỏ 🐰",
      img: "rabbit.jpg"
    },
    {
      clue: "Con vật này thân hình to lớn nhất trên cạn, có cái vòi dài và đôi tai to như hai cái quạt. Là con gì nhỉ?",
      keywords: ["voi"],
      nameDisplay: "Con Voi 🐘",
      img: "elephant.jpg"
    }
  ];

  let currentIdx = 0;
  let stickerCollected = 0;

  const clueText = document.getElementById("clue-text");
  const currentRound = document.getElementById("current-round");
  const totalRoundsText = document.getElementById("total-rounds");
  const answerInput = document.getElementById("answer-input");
  const guessBtn = document.getElementById("guess-btn");
  const resultCard = document.getElementById("result-card");
  const animalImg = document.getElementById("animal-img");
  const animalName = document.getElementById("animal-name");
  const nextBtn = document.getElementById("next-btn");
  const stickerCount = document.getElementById("sticker-count");
  const finishModal = document.getElementById("finish-modal");
  const restartBtn = document.getElementById("restart-btn");

  const sfxCorrect = new Audio("assets/sounds/ting.mp3");
  const sfxWrong = new Audio("assets/sounds/wrong.mp3");

  function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadQuestion() {
    resultCard.classList.add("hidden");
    answerInput.value = "";
    answerInput.classList.remove("shake-error");
    answerInput.disabled = false;
    guessBtn.disabled = false;

    const currentData = quizData[currentIdx];
    clueText.textContent = currentData.clue;

    currentRound.textContent = currentIdx + 1;
    totalRoundsText.textContent = quizData.length;

    answerInput.focus();
  }

  function checkAnswer() {
    const userInput = answerInput.value.trim().toLowerCase();

    if (userInput === "") {
      highlightError();
      return;
    }

    const currentData = quizData[currentIdx];
    let isCorrect = false;

    for (let kw of currentData.keywords) {
      if (userInput.includes(kw)) {
        isCorrect = true;
        break;
      }
    }

    if (isCorrect) {
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();

      stickerCollected++;
      stickerCount.textContent = stickerCollected;

      answerInput.disabled = true;
      guessBtn.disabled = true;

      animalImg.src = `assets/images/${currentData.img}`;
      animalName.textContent = currentData.nameDisplay;
      resultCard.classList.remove("hidden");

      resultCard.scrollIntoView({ behavior: "smooth" });
    } else {
      sfxWrong.currentTime = 0;
      sfxWrong.play();
      highlightError();
    }
  }

  function highlightError() {
    answerInput.classList.add("shake-error");
    setTimeout(() => {
      answerInput.classList.remove("shake-error");
    }, 400);
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

    shuffleQuestions(quizData);
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

  shuffleQuestions(quizData);
  loadQuestion();
});
