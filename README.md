# DỰ ÁN WEB HỌC TẬP TƯƠNG TÁC: "CON VẬT QUANH EM"

## BÁO CÁO KẾT THÚC HỌC PHẦN: THIẾT KẾ DẠY HỌC

---

## I. TỔNG QUAN DỰ ÁN

- **Tên dự án:** Con vật quanh em (Animals Around Us)
- **Đối tượng hướng đến:** Học sinh lớp 1 (6-7 tuổi).
- **Mục tiêu giáo dục:**
  - Nhận biết và gọi tên đúng các con vật quen thuộc.
  - Xác định được các bộ phận bên ngoài của động vật.
  - Phân loại động vật theo lợi ích, tác hại và môi trường sống.
  - Giáo dục kỹ năng sống, lòng yêu thương và ý thức bảo vệ động vật.
- **Triết lý thiết kế UI/UX:**
  - **Giao diện thân thiện:** Sử dụng gam màu Pastel (vàng nhạt, xanh dịu) để tránh gây mỏi mắt và mất tập trung cho trẻ.
  - **Tương tác đơn giản:** Ưu tiên click/chạm và kéo thả, hạn chế tối đa việc nhập liệu văn bản.
  - **Phông chữ Nunito:** Font chữ không chân, bo tròn góc, kích thước lớn giúp trẻ lớp 1 dễ dàng nhận diện mặt chữ.

---

## II. PHÂN TÍCH CHI TIẾT 9 MINI-GAMES

### Tiết 1:

1.  **Game 1: Nghe tiếng kêu**
    - **Mục tiêu:** Nghe tiếng kêu đoán đó là do con vật nào phát ra
    - **Phản hồi:** Đúng hiện viền xanh khích lệ, sai hiện viền đỏ và rung nhẹ

2.  **Game 2: Xem hình gọi tên con vật**
    - **Mục tiêu:** Nhận diện 10 con vật quen thuộc (Chó, mèo, gà, vịt...).
    - **Cách chơi:** Xem ảnh con vật và chọn thẻ tên tương ứng.

3.  **Game 3: Phiếu quan sát**
    - **Mục tiêu:** Phát triển kỹ năng quan sát chi tiết.
    - **Cách chơi:** Học sinh tích chọn đặc điểm (to/nhỏ, màu lông, sừng/mỏ) cho một con vật cụ thể như bò, vịt hoặc kiến.

### Tiết 2:

4.  **Game 4: Chỉ đúng bộ phận**
    - **Mục tiêu:** Nhận biết các bộ phận đặc trưng (Đuôi, Chân, Vây, Càng)
    - **Phản hồi:** Đúng hiện viền xanh khích lệ, sai hiện viền đỏ và rung nhẹ kèm gợi ý quan sát lại.

5.  **Game 5: Di chuyển bằng gì**
    - **Mục tiêu:** Nhận diện bộ phận giúp các con vật di chuyển
    - **Cách chơi:** Xem ảnh con vật và chọn thẻ bộ phận tương ứng.

6.  **Game 6: Đố bạn con gì**
    - **Mục tiêu:** Đoán con vật dựa trên đặc điểm của nó
    - **Cách chơi:** Học sinh điền đáp án vào chỗ trống dựa trên gợi ý được đưa ra.

### Tiết 3:

7.  **Game 7: Lợi ích của con vật**
    - **Mục tiêu:** Phân loại theo công dụng.
    - **Phân nhóm:** Thức ăn (Gà, Cá), Sức kéo (Trâu, Bò), Thú cưng (Chó, Mèo).

8.  **Game 8: Động vật có hại**
    - **Mục tiêu:** Nhận biết tác hại của các loài vật gây bệnh.
    - **Đối tượng:** Chuột, gián, ruồi, muỗi. Giáo dục ý thức giữ gìn vệ sinh môi trường sống.

9.  **Game 9: Ứng xử an toàn**
    - **Mục tiêu:** Giáo dục kỹ năng sống.
    - **Tình huống:** Chọn hành động đúng khi tiếp xúc với động vật (Yêu quý vật nuôi, tránh xa động vật lạ/nguy hiểm).

---

## III. THIẾT KẾ KỸ THUẬT (TECHNICAL STACK)

Dự án được xây dựng dựa trên nền tảng Web hiện đại, tối ưu cho việc triển khai dạy học trực tuyến:

- **Backend:** Node.js & Express Framework.
- **Template Engine:** EJS (Embedded JavaScript) giúp quản lý giao diện linh hoạt.
- **Frontend Logic:** Vanilla JavaScript (ES6+).
- **Styling:** CSS3 với kỹ thuật Flexbox, Grid và đặc biệt là `Clip-path` để xử lý tương tác hình ảnh phức tạp.
- **Cấu trúc thư mục chuẩn:**
  - `/views`: Chứa các màn hình Game (EJS).
  - `/public/style`: CSS đồng bộ hóa phong cách toàn dự án.
  - `/public/js`: Logic xử lý âm thanh, tính điểm và tương tác.
  - `/public/sounds`: Kho âm thanh phản hồi sư phạm (Ting, Wrong, Wow).

---

## IV. HƯỚNG DẪN TRIỂN KHAI (SETUP GUIDE)

### 1. Cài đặt môi trường

Đảm bảo máy tính đã cài đặt **Node.js**.

### 2. Chạy dự án cục bộ

```bash
# Cài đặt các thư viện cần thiết
npm install

# Khởi chạy server
node app.js
```

Truy cập địa chỉ: `http://localhost:3000`

### 3. Đẩy code lên GitHub

Để chia sẻ dự án với giảng viên và bạn bè, thực hiện các lệnh sau tại thư mục gốc:

```bash
# Khởi tạo Git
git init

# Thêm tất cả các file
git add .

# Commit thay đổi
git commit -m "Initial commit: Hoàn thiện 9 mini-games dự án Con vật quanh em"

# Kết nối với Repo của bạn (Thay URL dưới đây bằng link của bạn)
git remote add origin https://github.com/[YOUR_USERNAME]/animal-project.git

# Đẩy code
git branch -M main
git push -u origin main
```

---

**Người thực hiện:** Sinh viên xuất sắc - Đại học Bách Khoa Hà Nội (HUST)
**Chuyên ngành:** Công nghệ Giáo dục (EdTech)
