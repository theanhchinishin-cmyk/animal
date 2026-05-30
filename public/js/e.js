document.addEventListener("DOMContentLoaded", () => {
  const animalData = [
    { id: "monkey", name: "Khỉ", img: "monkey.jpg", env: "land" },
    { id: "tiger", name: "Hổ", img: "tiger.jpg", env: "land" },
    { id: "dolphin", name: "Cá heo", img: "dolphin.jpg", env: "water" },
    { id: "octopus", name: "Bạch tuộc", img: "octopus.jpg", env: "water" },
    { id: "earthworm", name: "Giun đất", img: "earthworm.jpg", env: "soil" },
    { id: "mole", name: "Chuột chũi", img: "mole.jpg", env: "soil" }
  ];

  const pool = document.getElementById("animals-pool");
  const zones = document.querySelectorAll(".zone");
  const modal = document.getElementById("victory-modal");
  const replayBtn = document.getElementById("replay-btn");

  const sfxCorrect = new Audio("/sounds/ting.mp3");
  const sfxWrong = new Audio("/sounds/wrong.mp3");

  function initGame() {
    pool.innerHTML = "";
    document.getElementById("content-land").innerHTML = "";
    document.getElementById("content-water").innerHTML = "";
    document.getElementById("content-soil").innerHTML = "";
    modal.classList.remove("active");

    const shuffledAnimals = [...animalData];
    for (let i = shuffledAnimals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnimals[i], shuffledAnimals[j]] = [
        shuffledAnimals[j],
        shuffledAnimals[i]
      ];
    }

    shuffledAnimals.forEach((animal) => {
      const card = document.createElement("div");
      card.className = "animal-card";
      card.setAttribute("draggable", "true");
      card.dataset.id = animal.id;
      card.dataset.env = animal.env;

      card.innerHTML = `
                <img src="/images/${animal.img}" alt="${animal.name}">
                <span>${animal.name}</span>
            `;

      card.addEventListener("dragstart", dragStart);
      card.addEventListener("dragend", dragEnd);

      pool.appendChild(card);
    });
  }

  let draggedCard = null;

  function dragStart(e) {
    draggedCard = this;
    this.style.opacity = "0.5";
  }

  function dragEnd() {
    draggedCard = null;
    this.style.opacity = "1";
  }

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone.addEventListener("dragenter", function () {
      this.classList.add("drag-over");
    });

    zone.addEventListener("dragleave", function () {
      this.classList.remove("drag-over");
    });

    zone.addEventListener("drop", function (e) {
      this.classList.remove("drag-over");
      if (!draggedCard) return;

      const targetEnv = this.dataset.env;
      const animalEnv = draggedCard.dataset.env;
      const currentCard = draggedCard;

      if (targetEnv === animalEnv) {
        sfxCorrect.currentTime = 0;
        sfxCorrect.play();

        const contentBox = this.querySelector(".zone-content");
        contentBox.appendChild(currentCard);
        currentCard.setAttribute("draggable", "false");
        currentCard.style.cursor = "default";

        checkVictory();
      } else {
        sfxWrong.currentTime = 0;
        sfxWrong.play();

        currentCard.classList.add("wrong-shake");
        setTimeout(() => {
          currentCard.classList.remove("wrong-shake");
        }, 400);
      }
    });
  });

  function checkVictory() {
    if (pool.children.length === 0) {
      setTimeout(() => {
        modal.classList.add("active");
      }, 500);
    }
  }

  replayBtn.addEventListener("click", initGame);

  initGame();
});
