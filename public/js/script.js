document.addEventListener("DOMContentLoaded", () => {
  const originalAnimals = [
    {
      id: "dog",
      name: "Chó",
      img: "dog.jpg",
      sound: "dog.mp3",
      fact: "Chó nuôi trong nhà, giúp gia đình giữ nhà và bắt trộm đấy!"
    },
    {
      id: "cat",
      name: "Mèo",
      img: "cat.jpg",
      sound: "cat.mp3",
      fact: "Mèo sống trong nhà, ban ngày hay ngủ nướng nhưng ban đêm bắt chuột siêu đỉnh."
    },
    {
      id: "chicken",
      name: "Gà",
      img: "chicken.jpg",
      sound: "chicken.mp3",
      fact: 'Gà sống ở nông trại. Gà mái đẻ trứng, còn gà trống gáy "Ò ó o" gọi mặt trời dậy.'
    },
    {
      id: "cow",
      name: "Bò",
      img: "cow.jpg",
      sound: "cow.mp3",
      fact: "Bò sống ngoài đồng cỏ, ăn cỏ xanh và cho chúng ta những ly sữa tươi ngon lành."
    },
    {
      id: "duck",
      name: "Vịt",
      img: "duck.jpg",
      sound: "duck.mp3",
      fact: "Vịt sống ở ao hồ, chúng có bộ lông không thấm nước và bơi lội rất cừ."
    },
    {
      id: "pig",
      name: "Heo",
      img: "pig.jpg",
      sound: "pig.mp3",
      fact: "Heo (lợn) sống ở chuồng trại, rất thích ăn cám và hay lăn lộn trong bùn để làm mát cơ thể."
    }
  ];

  let remainingAnimals = [...originalAnimals];
  let currentCorrectAnimal = null;
  let isGameOver = false;

  const grid = document.getElementById("animal-grid");
  const playBtn = document.getElementById("play-question-btn");
  const modal = document.getElementById("success-modal");
  const nextBtn = document.getElementById("next-btn");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalFact = document.getElementById("modal-fact");
  const modalAnimalName = document.getElementById("modal-animal-name");

  const audioPlayer = new Audio();
  const sfxCorrect = new Audio("/sounds/ting.mp3");
  const sfxWrong = new Audio("/sounds/wrong.mp3");

  function initGame() {
    isGameOver = false;
    modalTitle.textContent = "Hoan hô! Bé đoán đúng rồi! 🎉";
    nextBtn.textContent = "Chơi tiếp thôi!";

    const randomIndex = Math.floor(Math.random() * remainingAnimals.length);
    currentCorrectAnimal = remainingAnimals[randomIndex];

    audioPlayer.src = `/sounds/${currentCorrectAnimal.sound}`;

    const shuffledAnimals = [...remainingAnimals];
    for (let i = shuffledAnimals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnimals[i], shuffledAnimals[j]] = [
        shuffledAnimals[j],
        shuffledAnimals[i]
      ];
    }

    grid.innerHTML = "";
    shuffledAnimals.forEach((animal) => {
      const card = document.createElement("div");
      card.className = "animal-card";
      card.dataset.id = animal.id;

      card.innerHTML = `
                <img src="/images/${animal.img}" alt="${animal.name}" class="animal-img">
                <span>${animal.name}</span>
            `;
      grid.appendChild(card);
    });
  }

  playBtn.addEventListener("click", () => {
    if (remainingAnimals.length === 0) return;
    audioPlayer.play();
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".animal-card");
    if (!card) return;

    const clickedId = card.dataset.id;

    if (clickedId === currentCorrectAnimal.id) {
      audioPlayer.pause();

      sfxCorrect.currentTime = 0;
      sfxCorrect.play();

      remainingAnimals = remainingAnimals.filter(
        (animal) => animal.id !== currentCorrectAnimal.id
      );

      showSuccessModal(currentCorrectAnimal);
    } else {
      sfxWrong.currentTime = 0;
      sfxWrong.play();

      card.classList.add("wrong-choice");

      setTimeout(() => {
        card.classList.remove("wrong-choice");
      }, 400);
    }
  });

  function showSuccessModal(animal) {
    modalAnimalName.textContent = animal.name;
    modalFact.textContent = animal.fact;
    modalImg.src = `images/${animal.img}`;
    modalImg.alt = animal.name;

    if (remainingAnimals.length === 0) {
      isGameOver = true;
      modalTitle.textContent = "👑 BÉ ĐÃ PHÁ ĐẢO GAME! 👑";
      modalFact.textContent =
        animal.fact +
        "\n\nXuất sắc quá! Bé đã nhận biết được hết tất cả các loài động vật ngày hôm nay rồi đấy!";
      nextBtn.textContent = "Chơi lại từ đầu nhé";
    }

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
  }

  nextBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";

      if (isGameOver) {
        remainingAnimals = [...originalAnimals];
      }

      initGame();
    }, 300);
  });
  initGame();
});
