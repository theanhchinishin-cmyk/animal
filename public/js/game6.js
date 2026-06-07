document.addEventListener("DOMContentLoaded", () => {
  // ========== PHẦN 1: BỘ SƯU TẬP ==========
  let selectedEmoji = "🐱";
  const emojiOpts = document.querySelectorAll(".emoji-opt");
  const studentNameInput = document.getElementById("student-name");
  const petNameInput = document.getElementById("pet-name");
  const petHabitInput = document.getElementById("pet-habit");
  const addToBoardBtn = document.getElementById("add-to-board-btn");
  const whiteboardContent = document.getElementById("whiteboard-content");

  const sfxCorrect = new Audio("/sounds/ting.mp3");
  const sfxWrong = new Audio("/sounds/wrong.mp3");

  emojiOpts.forEach((opt) => {
    opt.addEventListener("click", function () {
      document.querySelectorAll(".emoji-opt").forEach(o => o.classList.remove("active"));
      this.classList.add("active");
      selectedEmoji = this.dataset.emoji;
    });
  });

  addToBoardBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const petName = petNameInput.value.trim();
    const habit = petHabitInput.value.trim();

    let hasError = false;
    [studentNameInput, petNameInput, petHabitInput].forEach((inp, i) => {
      if ((i === 0 && name === "") || (i === 1 && petName === "") || (i === 2 && habit === "")) {
        inp.classList.add("shake-error");
        setTimeout(() => inp.classList.remove("shake-error"), 400);
        hasError = true;
      }
    });
    if (hasError) return;

    const emptyText = whiteboardContent.querySelector(".empty-text");
    if (emptyText) emptyText.remove();

    const note = document.createElement("div");
    note.className = "sticky-note";
    note.innerHTML = `
      <div class="note-head">${selectedEmoji}</div>
      <div class="note-body">
        Nhà bạn <strong style="color:#e67e22;">${name}</strong> nuôi bạn tên là <strong style="color:#2ecc71;">${petName}</strong>, bạn ấy ${habit}!
      </div>
    `;

    whiteboardContent.appendChild(note);
    sfxCorrect.currentTime = 0;
    sfxCorrect.play();

    studentNameInput.value = "";
    petNameInput.value = "";
    petHabitInput.value = "";
    studentNameInput.focus();
  });

  // ========== PHẦN 2: TÌNH HUỐNG ==========
  const scenarioData = [
    {
      situation: "🐱 Thấy bạn đang trêu chọc mèo, em sẽ làm gì?",
      options: ["Khuyên bạn không nên trêu mèo", "Cùng bạn trêu mèo", "Mặc kệ bạn", "Cười cợt bạn"],
      correct: "Khuyên bạn không nên trêu mèo"
    },
    {
      situation: "🐟 Em có một bể cá nhỏ, em cần làm gì hằng ngày?",
      options: ["Cho cá ăn vừa đủ và thay nước", "Cho cá ăn thật nhiều", "Không cần chăm sóc", "Bỏ mặc bể cá"],
      correct: "Cho cá ăn vừa đủ và thay nước"
    },
    {
      situation: "🐕 Em nuôi một chú chó nhỏ, em nên làm gì mỗi ngày?",
      options: ["Cho chó ăn và dắt đi dạo", "Nhốt chó trong chuồng", "Không chơi với chó", "Để chó tự lo"],
      correct: "Cho chó ăn và dắt đi dạo"
    },
    {
      situation: "🐦 Em thấy tổ chim non bị rơi xuống đất, em sẽ làm gì?",
      options: ["Nhờ người lớn đặt lại lên cây", "Bắt chim non về nuôi", "Mặc kệ tổ chim", "Ném đá vào tổ chim"],
      correct: "Nhờ người lớn đặt lại lên cây"
    },
    {
      situation: "🐰 Em muốn chơi cùng bạn thỏ, em nên làm gì?",
      options: ["Nhẹ nhàng vuốt ve và cho thỏ ăn", "Kéo tai thỏ", "Đuổi thỏ chạy", "Ném đồ chơi vào thỏ"],
      correct: "Nhẹ nhàng vuốt ve và cho thỏ ăn"
    },
    {
      situation: "🦟 Buổi tối có nhiều muỗi quá! Em sẽ làm gì để không bị muỗi đốt?",
      options: ["Ngủ trong màn", "Mở cửa sổ thật to", "Ra ngoài sân chơi", "Bật đèn sáng"],
      correct: "Ngủ trong màn"
    },
    {
      situation: "🐍 Em thấy một con rắn trong vườn, em sẽ làm gì?",
      options: ["Đứng yên và gọi người lớn", "Lại gần xem rắn", "Lấy gậy chọc rắn", "Bắt rắn chơi"],
      correct: "Đứng yên và gọi người lớn"
    },
    {
      situation: "🐝 Thấy tổ ong trên cây, em nên làm gì?",
      options: ["Tránh xa và không chọc phá", "Ném đá vào tổ ong", "Leo lên cây lấy mật", "Rung cây cho ong bay"],
      correct: "Tránh xa và không chọc phá"
    },
    {
      situation: "🪰 Em thấy con ruồi đậu vào thức ăn, em sẽ làm gì?",
      options: ["Đậy thức ăn lại cẩn thận", "Đuổi ruồi đi rồi ăn tiếp", "Mặc kệ không quan tâm", "Bỏ thức ăn đi ngay"],
      correct: "Đậy thức ăn lại cẩn thận"
    },
    {
      situation: "🐀 Nhà em thấy có chuột hoặc gián, em nên làm gì?",
      options: ["Giữ nhà cửa sạch sẽ và báo người lớn", "Bắt chuột chơi", "Bỏ mặc không quan tâm", "Để thức ăn bừa bãi"],
      correct: "Giữ nhà cửa sạch sẽ và báo người lớn"
    }
  ];

  let scenarioIdx = 0;
  let scenarioScore = 0;
  let scenarioAnswered = false;

  const scenarioCurrentSpan = document.getElementById("scenario-current");
  const scenarioTotalSpan = document.getElementById("scenario-total");
  const scenarioDots = document.getElementById("scenario-dots");
  const scenarioText = document.getElementById("scenario-text");
  const scenarioOptions = document.getElementById("scenario-options");
  const scenarioFeedback = document.getElementById("scenario-feedback");
  const scenarioNextBtn = document.getElementById("scenario-next-btn");
  const victoryModal = document.getElementById("victory-modal");
  const restartBtn = document.getElementById("restart-btn");
  const scoreSpan = document.getElementById("score-count");

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initScenarioDots() {
    scenarioDots.innerHTML = "";
    scenarioData.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      scenarioDots.appendChild(dot);
    });
  }

  function updateScenarioDots() {
    const dots = scenarioDots.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.remove("active", "completed");
      if (i < scenarioIdx) dot.classList.add("completed");
      if (i === scenarioIdx) dot.classList.add("active");
    });
  }

  function loadScenario() {
    scenarioAnswered = false;
    scenarioFeedback.classList.add("hidden");
    scenarioNextBtn.classList.add("hidden");
    scenarioOptions.innerHTML = "";

    const s = scenarioData[scenarioIdx];
    scenarioCurrentSpan.textContent = scenarioIdx + 1;
    scenarioTotalSpan.textContent = scenarioData.length;
    scenarioText.textContent = s.situation;
    updateScenarioDots();

    const shuffled = shuffle([...s.options]);
    shuffled.forEach((opt) => {
      const div = document.createElement("div");
      div.className = "scenario-option";
      div.textContent = opt;
      div.addEventListener("click", () => handleScenarioAnswer(opt, div));
      scenarioOptions.appendChild(div);
    });
  }

  function handleScenarioAnswer(selected, el) {
    if (scenarioAnswered) return;
    const s = scenarioData[scenarioIdx];
    const allOpts = scenarioOptions.querySelectorAll(".scenario-option");
    scenarioAnswered = true;

    allOpts.forEach((o) => o.classList.add("disabled"));

    const correctMessages = [
      "Con giỏi quá! 🎉",
      "Tuyệt vời! Con thật thông minh! ⭐",
      "Rất tốt! Con biết yêu quý con vật và bảo vệ sức khỏe!",
      "Xuất sắc! Con làm rất đúng! 🌟",
      "Con làm tốt lắm! Hãy tiếp tục phát huy nhé! 💪"
    ];
    const wrongMessages = [
      "Con hãy chọn hành động an toàn và đúng hơn nhé.",
      "Chưa đúng rồi, con thử suy nghĩ lại nhé!",
      "Hãy thử lại nhé! Con có thể làm được mà!",
      "Không phải đâu, con hãy chọn cách an toàn hơn nhé!"
    ];

    if (selected === s.correct) {
      el.classList.add("btn-correct");
      scenarioFeedback.textContent = correctMessages[Math.floor(Math.random() * correctMessages.length)];
      scenarioFeedback.className = "scenario-feedback feedback-correct";
      sfxCorrect.currentTime = 0;
      sfxCorrect.play();
      scenarioScore++;
      scoreSpan.textContent = scenarioScore;
    } else {
      el.classList.add("btn-wrong");
      allOpts.forEach((o) => {
        if (o.textContent === s.correct) o.classList.add("btn-correct");
      });
      scenarioFeedback.textContent = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      scenarioFeedback.className = "scenario-feedback feedback-wrong";
      sfxWrong.currentTime = 0;
      sfxWrong.play();
    }

    scenarioFeedback.classList.remove("hidden");
    if (scenarioIdx < scenarioData.length - 1) {
      scenarioNextBtn.classList.remove("hidden");
      scenarioNextBtn.textContent = "Tình huống tiếp theo ➡️";
    } else {
      scenarioNextBtn.classList.remove("hidden");
      scenarioNextBtn.textContent = "Xem kết quả 🎉";
    }
  }

  function handleScenarioNext() {
    scenarioIdx++;
    if (scenarioIdx < scenarioData.length) {
      loadScenario();
    } else {
      victoryModal.classList.add("active");
    }
  }

  function restartGame() {
    scenarioIdx = 0;
    scenarioScore = 0;
    scoreSpan.textContent = "0";
    victoryModal.classList.remove("active");
    initScenarioDots();
    loadScenario();
  }

  shuffle(scenarioData);

  scenarioNextBtn.addEventListener("click", handleScenarioNext);
  restartBtn.addEventListener("click", restartGame);

  scenarioTotalSpan.textContent = scenarioData.length;
  initScenarioDots();
  loadScenario();
});
