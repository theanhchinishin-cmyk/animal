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
  res.render("home", {});
});
app.get("/e", (req, res) => {
  res.render("e", {});
});
app.get("/index", (req, res) => {
  res.render("index", {});
});
app.get("/secret", (req, res) => {
  res.render("secret", {});
});
app.get("/4", (req, res) => {
  res.render("4", {});
});

app.listen(PORT, () => {
  console.log(`Server đang chạy online cực mượt tại cổng: ${PORT}`);
});
