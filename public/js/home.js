// public/js/home.js

document.addEventListener("DOMContentLoaded", function () {
  // 1. LẤY ĐÚNG ĐÍCH DANH 2 PHÂN VÙNG NỘI DUNG LỚN
  const secTheory = document.getElementById("ly-thuyet");
  const secActivity = document.getElementById("hoat-dong");

  // Hàm xử lý hoán đổi class active để ẩn/hiện tab chuẩn theo CSS của m
  function switchTab(target) {
    if (!secTheory || !secActivity) return;

    if (target === "ly-thuyet") {
      secTheory.classList.add("active");
      secActivity.classList.remove("active");
    } else if (target === "hoat-dong") {
      secActivity.classList.add("active");
      secTheory.classList.remove("active");
    }
  }

  // ==========================================================================
  // 2. LOGIC ĐIỀU HƯỚNG THEO URL HASH (CHO CẢ DROPDOWN HEADER VÀ CLICK TRANG CHỦ)
  // ==========================================================================
  function handleUrlHash(hashValue) {
    if (hashValue === "#ly-thuyet") {
      switchTab("ly-thuyet");
      setTimeout(() => {
        secTheory.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (hashValue === "#hoat-dong" || hashValue === "#hoạt-động") {
      switchTab("hoat-dong");
      setTimeout(() => {
        secActivity.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  // Tình huống 1: Từ các trang game con bấm nút trên Header để nhảy về trang chủ (Load lại trang)
  if (window.location.hash) {
    setTimeout(() => {
      handleUrlHash(window.location.hash);
    }, 200); // Đợi 200ms cho DOM và Iframe ổn định cấu trúc
  }

  // Tình huống 2: Đang đứng sẵn ở trang chủ, click đổi mục trên thanh Header chung
  window.addEventListener("hashchange", function () {
    handleUrlHash(window.location.hash);
  });

  // ==========================================================================
  // 3. LOGIC XEM TOÀN MÀN HÌNH (FULLSCREEN SLIDE) - ĐÚNG THEO FILE EJS CỦA M
  // ==========================================================================
  const minifiedBtn = document.getElementById("goFullscreen");
  const container = document.getElementById("slideContainer");

  if (minifiedBtn && container) {
    minifiedBtn.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        // Phóng to toàn bộ khung chứa Slide
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          /* Safari */
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          /* IE11 */
          container.msRequestFullscreen();
        }
        minifiedBtn.innerHTML = '<i class="fa-solid fa-compress"></i> Thu Nhỏ';
      } else {
        // Thoát chế độ toàn màn hình
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        minifiedBtn.innerHTML =
          '<i class="fa-solid fa-expand"></i> Xem Toàn Màn Hình';
      }
    });

    // Bắt sự kiện người dùng bấm phím ESC để thoát Fullscreen
    document.addEventListener("fullscreenchange", function () {
      if (!document.fullscreenElement) {
        minifiedBtn.innerHTML =
          '<i class="fa-solid fa-expand"></i> Xem Toàn Màn Hình';
      }
    });
  }
});
