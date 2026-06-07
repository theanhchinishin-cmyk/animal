const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/e", (req, res) => {
  res.render("e");
});
app.get("/secret", (req, res) => {
  res.render("secret");
});
app.get("/game1", (req, res) => {
  res.render("game1");
});
app.get("/game2", (req, res) => {
  res.render("game2");
});
app.get("/game3", (req, res) => {
  res.render("game3");
});
app.get("/game4", (req, res) => {
  res.render("game4");
});
app.get("/game5", (req, res) => {
  res.render("game5");
});
app.get("/game6", (req, res) => {
  res.render("game6");
});

app.listen(PORT, () => {
  console.log(`Server đang chạy online cực mượt tại cổng: ${PORT}`);
});
