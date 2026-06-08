document.addEventListener("DOMContentLoaded", () => {
  let selectedImg = "cat.jpg";
  let correctAnswersClicked = 0;
  let totalPinnedCount = 0;
  const totalCorrectNeeded = 2;

  const emojiOpts = document.querySelectorAll(".emoji-opt");
  const studentNameInput = document.getElementById("student-name");
  const petNameInput = document.getElementById("pet-name");
  const petHabitInput = document.getElementById("pet-habit");
  const addToBoardBtn = document.getElementById("add-to-board-btn");
  const whiteboardContent = document.getElementById("whiteboard-content");
  const goToStep2Btn = document.getElementById("go-to-step-2-btn");
  const step2Box = document.getElementById("step-2-box");
  const actionBtns = document.querySelectorAll(".action-btn");
  const loveProgress = document.getElementById("love-progress");
  const celebrateModal = document.getElementById("celebrate-modal");

  const sfxCorrect = new Audio("/sounds/wow.mp3");
  const sfxWrong = new Audio("/sounds/wrong.mp3");

  emojiOpts.forEach((opt) => {
    opt.addEventListener("click", function () {
      document.querySelector(".emoji-opt.active").classList.remove("active");
      this.classList.add("active");
      selectedImg = this.dataset.img;
    });
  });

  addToBoardBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const petName = petNameInput.value.trim();
    const habit = petHabitInput.value.trim();

    let hasError = false;
    if (name === "") {
      studentNameInput.classList.add("shake-error");
      setTimeout(() => studentNameInput.classList.remove("shake-error"), 400);
      hasError = true;
    }
    if (petName === "") {
      petNameInput.classList.add("shake-error");
      setTimeout(() => petNameInput.classList.remove("shake-error"), 400);
      hasError = true;
    }
    if (habit === "") {
      petHabitInput.classList.add("shake-error");
      setTimeout(() => petHabitInput.classList.remove("shake-error"), 400);
      hasError = true;
    }
    if (hasError) return;

    const emptyText = whiteboardContent.querySelector(".empty-text");
    if (emptyText) emptyText.remove();

    const note = document.createElement("div");
    note.className = "sticky-note";
    note.innerHTML = `
            <div class="note-head"><img src="/images/${selectedImg}" alt="Thú cưng" style="width:40px;height:40px;object-fit:cover;border-radius:8px;"></div>
            <div class="note-body">
                Nhà bạn <strong style="color:#e67e22;">${name}</strong> nuôi bạn tên là <strong style="color:#2ecc71;">${petName}</strong>, bạn ấy ${habit}!
            </div>
        `;

    whiteboardContent.appendChild(note);
    sfxCorrect.currentTime = 0;
    sfxCorrect.play();

    totalPinnedCount++;

    studentNameInput.value = "";
    petNameInput.value = "";
    petHabitInput.value = "";
    studentNameInput.focus();

    if (totalPinnedCount > 0) {
      goToStep2Btn.classList.remove("hidden");
    }
  });

  goToStep2Btn.addEventListener("click", () => {
    step2Box.classList.remove("hidden");
    step2Box.scrollIntoView({ behavior: "smooth" });
  });

  actionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("correct")) {
        if (!this.classList.contains("selected-correct")) {
          this.classList.add("selected-correct");
          sfxCorrect.currentTime = 0;
          sfxCorrect.play();

          correctAnswersClicked++;
          const pct = (correctAnswersClicked / totalCorrectNeeded) * 100;
          loveProgress.style.width = `${pct}%`;

          if (correctAnswersClicked === totalCorrectNeeded) {
            setTimeout(() => {
              celebrateModal.classList.add("active");
            }, 800);
          }
        }
      } else {
        this.classList.add("selected-wrong");
        sfxWrong.currentTime = 0;
        sfxWrong.play();
        setTimeout(() => this.classList.remove("selected-wrong"), 400);
      }
    });
  });
});
