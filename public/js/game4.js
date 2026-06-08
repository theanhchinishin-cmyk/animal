document.addEventListener("DOMContentLoaded", () => {
  const animals = [
    { id: "ca", emoji: "\ud83d\udc1f", name: "Con C\u00e1", benefit: "L\u00e0m th\u1ee9c \u0103n" },
    { id: "ga", emoji: "\ud83d\udc14", name: "Con G\u00e0", benefit: "L\u00e0m th\u1ee9c \u0103n" },
    { id: "lon", emoji: "\ud83d\udc37", name: "Con L\u1ee3n", benefit: "L\u00e0m th\u1ee9c \u0103n" },
    { id: "trau", emoji: "\ud83d\udc03", name: "Con Tr\u00e2u", benefit: "S\u1ee9c k\u00e9o" },
    { id: "bo", emoji: "\ud83d\udc02", name: "Con B\u00f2", benefit: "S\u1ee9c k\u00e9o" },
    { id: "ngua", emoji: "\ud83d\udc34", name: "Con Ng\u1ef1a", benefit: "S\u1ee9c k\u00e9o" },
    { id: "meo", emoji: "\ud83d\udc31", name: "Con M\u00e8o", benefit: "B\u1eaft chu\u1ed9t" },
    { id: "cho", emoji: "\ud83d\udc36", name: "Con Ch\u00f3", benefit: "Gi\u1eef nh\u00e0" },
    { id: "chim", emoji: "\ud83d\udc26", name: "Con Chim", benefit: "L\u00e0m c\u1ea3nh" },
    { id: "ca-canh", emoji: "\ud83d\udc20", name: "C\u00e1 c\u1ea3nh", benefit: "L\u00e0m c\u1ea3nh" }
  ];

  const benefitGroups = [
    { name: "L\u00e0m th\u1ee9c \u0103n", icon: "🍽️" },
    { name: "S\u1ee9c k\u00e9o", icon: "💪" },
    { name: "B\u1eaft chu\u1ed9t", icon: "🐭" },
    { name: "Gi\u1eef nh\u00e0", icon: "🏠" },
    { name: "L\u00e0m c\u1ea3nh", icon: "🌸" }
  ];

  const draggableArea = document.getElementById("draggable-area");
  const dropZones = document.getElementById("drop-zones");
  const feedback = document.getElementById("feedback");
  const scoreSpan = document.getElementById("score-count");
  const totalSpan = document.getElementById("total-items");
  const victoryModal = document.getElementById("victory-modal");
  const resetBtn = document.getElementById("reset-btn");
  const restartBtn = document.getElementById("restart-btn");

  let placedCount = 0;
  let draggedItem = null;
  let touchClone = null;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initGame() {
    placedCount = 0;
    scoreSpan.textContent = "0";
    feedback.className = "feedback hidden";
    document.querySelectorAll(".placed-item").forEach((el) => el.remove());
    victoryModal.classList.remove("active");
    draggableArea.innerHTML = "";
    dropZones.innerHTML = "";

    const shuffled = shuffle([...animals]);

    shuffled.forEach((animal) => {
      const card = document.createElement("div");
      card.className = "drag-item";
      card.dataset.animalId = animal.id;
      card.dataset.benefit = animal.benefit;
      card.draggable = true;
      card.innerHTML =
        '<span class="drag-emoji">' +
        animal.emoji +
        '</span><span class="drag-name">' +
        animal.name +
        "</span>";
      card.addEventListener("dragstart", handleDragStart);
      card.addEventListener("dragend", handleDragEnd);
      card.addEventListener("touchstart", handleTouchStart, { passive: true });
      card.addEventListener("touchmove", handleTouchMove, { passive: false });
      card.addEventListener("touchend", handleTouchEnd);
      draggableArea.appendChild(card);
    });

    benefitGroups.forEach((group) => {
      const zone = document.createElement("div");
      zone.className = "drop-zone";
      zone.dataset.benefit = group.name;
      zone.innerHTML =
        '<div class="drop-zone-header"><span class="drop-zone-icon">' +
        group.icon +
        '</span><span class="drop-zone-title">' +
        group.name +
        '</span></div><div class="drop-zone-body"></div>';
      zone.addEventListener("dragover", handleDragOver);
      zone.addEventListener("dragenter", handleDragEnter);
      zone.addEventListener("dragleave", handleDragLeave);
      zone.addEventListener("drop", handleDrop);
      dropZones.appendChild(zone);
    });

    totalSpan.textContent = animals.length;
  }

  function handleDragStart(e) {
    draggedItem = this;
    this.classList.add("dragging");
    e.dataTransfer.setData("text/plain", this.dataset.animalId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
    document.querySelectorAll(".drop-zone").forEach((z) => z.classList.remove("drag-over"));
    draggedItem = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add("drag-over");
  }

  function handleDragLeave() {
    this.classList.remove("drag-over");
  }

  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("drag-over");
    if (!draggedItem) return;
    processDrop(draggedItem, this);
  }

  function handleTouchStart(e) {
    draggedItem = this;
    const touch = e.touches[0];
    const rect = this.getBoundingClientRect();

    touchClone = this.cloneNode(true);
    touchClone.style.position = "fixed";
    touchClone.style.width = rect.width + "px";
    touchClone.style.zIndex = "1000";
    touchClone.style.pointerEvents = "none";
    touchClone.style.opacity = "0.9";
    touchClone.style.transform = "scale(1.1) rotate(3deg)";
    touchClone.style.left = touch.clientX - rect.width / 2 + "px";
    touchClone.style.top = touch.clientY - rect.height / 2 + "px";
    document.body.appendChild(touchClone);

    this.classList.add("dragging");
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone || !draggedItem) return;
    const touch = e.touches[0];
    const rect = draggedItem.getBoundingClientRect();
    touchClone.style.left = touch.clientX - rect.width / 2 + "px";
    touchClone.style.top = touch.clientY - rect.height / 2 + "px";

    document.querySelectorAll(".drop-zone").forEach((z) => z.classList.remove("drag-over"));
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) {
      const zone = el.closest(".drop-zone");
      if (zone) zone.classList.add("drag-over");
    }
  }

  function handleTouchEnd(e) {
    if (touchClone) {
      touchClone.remove();
      touchClone = null;
    }
    if (!draggedItem) return;
    draggedItem.classList.remove("dragging");

    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) {
      const zone = el.closest(".drop-zone");
      if (zone) processDrop(draggedItem, zone);
    }

    document.querySelectorAll(".drop-zone").forEach((z) => z.classList.remove("drag-over"));
    draggedItem = null;
  }

  function processDrop(draggedEl, dropZone) {
    const dropBenefit = dropZone.dataset.benefit;
    const animal = animals.find((a) => a.id === draggedEl.dataset.animalId);
    if (!animal) return;

    clearTimeout(window.feedbackTimeout);

    if (animal.benefit === dropBenefit) {
      placedCount++;
      scoreSpan.textContent = placedCount;
      draggedEl.remove();

      const body = dropZone.querySelector(".drop-zone-body");
      const placed = document.createElement("div");
      placed.className = "placed-item";
      placed.innerHTML =
        '<span class="drag-emoji">' +
        animal.emoji +
        '</span><span class="drag-name">' +
        animal.name +
        "</span>";
      body.appendChild(placed);

      feedback.textContent = "Ch\u00ednh x\u00e1c! Con v\u1eadt n\u00e0y c\u00f3 \u00edch cho con ng\u01b0\u1eddi.";
      feedback.className = "feedback correct-fb";
      feedback.classList.remove("hidden");

      playSfx("correct");

      if (placedCount === animals.length) {
        setTimeout(() => victoryModal.classList.add("active"), 800);
      }
    } else {
      feedback.textContent = "Con h\u00e3y suy ngh\u0129 l\u1ea1i xem con v\u1eadt n\u00e0y gi\u00fap \u00edch g\u00ec nh\u00e9.";
      feedback.className = "feedback wrong-fb";
      feedback.classList.remove("hidden");

      playSfx("wrong");

      draggedEl.classList.add("shake");
      setTimeout(() => draggedEl.classList.remove("shake"), 500);
    }

    window.feedbackTimeout = setTimeout(() => feedback.classList.add("hidden"), 3000);
  }

  function playSfx(type) {
    try {
      const audio = new Audio(type === "correct" ? "/sounds/ting.mp3" : "/sounds/wrong.mp3");
      audio.currentTime = 0;
      audio.play();
    } catch (e) {}
  }

  function resetGame() {
    victoryModal.classList.remove("active");
    initGame();
  }

  resetBtn.addEventListener("click", resetGame);
  restartBtn.addEventListener("click", resetGame);
  initGame();
});
