document.addEventListener("DOMContentLoaded", () => {
  const animalData = [
    { id: "cho", name: "Chó", img: "dog.jpg" },
    { id: "meo", name: "Mèo", img: "cat.jpg" },
    { id: "ga", name: "Gà", img: "chicken.jpg" },
    { id: "vit", name: "Vịt", img: "duck.jpg" },
    { id: "ca", name: "Cá", img: "fish.jpg" },
    { id: "chim", name: "Chim", img: "bird.jpg" },
    { id: "trau", name: "Trâu", img: null, emoji: "🐃" },
    { id: "bo", name: "Bò", img: "cow.jpg" },
    { id: "lon", name: "Lợn", img: "pig.jpg" },
    { id: "kien", name: "Kiến", img: null, emoji: "🐜" }
  ];

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const progressBar = document.getElementById("progress-bar");
  const imageContainer = document.getElementById("image-container");
  const hintText = document.getElementById("hint-text");
  const optionsGrid = document.getElementById("options-grid");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const modal = document.getElementById("victory-modal");
  const replayBtn = document.getElementById("replay-btn");

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
    animalData.forEach((_, i) => {
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
    answered = false;
    feedback.classList.add("hidden");
    nextBtn.classList.add("hidden");
    optionsGrid.innerHTML = "";
    imageContainer.innerHTML = "";

    const q = animalData[currentIdx];
    updateProgress();

    if (q.img) {
      const img = document.createElement("img");
      img.src = "/images/" + q.img;
      img.alt = q.name;
      imageContainer.appendChild(img);
    } else {
      const span = document.createElement("span");
      span.className = "emoji-big";
      span.textContent = q.emoji;
      imageContainer.appendChild(span);
    }

    hintText.textContent = "Đây là con gì?";

    const allNames = animalData.map(a => a.name);
    const wrongNames = allNames.filter(n => n !== q.name);
    shuffle(wrongNames);
    const options = [q.name, ...wrongNames.slice(0, 3)];
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
    const q = animalData[currentIdx];
    const allOpts = optionsGrid.querySelectorAll(".option-item");
    answered = true;

    allOpts.forEach((o) => o.classList.add("disabled"));

    if (selected === q.name) {
      el.classList.add("btn-correct");
      feedback.textContent = "Rất tốt! Con đã gọi đúng tên con vật.";
      feedback.className = "feedback correct-fb";
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();
      score++;
    } else {
      el.classList.add("btn-wrong");
      allOpts.forEach((o) => {
        if (o.textContent === q.name) o.classList.add("btn-correct");
      });
      feedback.textContent = "Con hãy quan sát lại hình dáng con vật nhé.";
      feedback.className = "feedback wrong-fb";
      sfxWrong.currentTime = 0;
      sfxWrong.play();
    }

    feedback.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = currentIdx < animalData.length - 1
      ? "Câu tiếp theo ➡️"
      : "Xem kết quả 🎉";
  }

  function handleNext() {
    currentIdx++;
    if (currentIdx < animalData.length) {
      loadQuestion();
    } else {
      modal.classList.add("active");
    }
  }

  function restartGame() {
    currentIdx = 0;
    score = 0;
    modal.classList.remove("active");
    shuffle(animalData);
    initProgress();
    loadQuestion();
  }

  shuffle(animalData);

  nextBtn.addEventListener("click", handleNext);
  replayBtn.addEventListener("click", restartGame);

  initProgress();
  loadQuestion();
});
