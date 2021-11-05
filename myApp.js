var express = require("express");
var app = express();

console.log("Hello World");

const indexPath = __dirname + "/views/index.html";
const cssPath = __dirname + "/public/style.css";

app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

app.get("/", express.static(cssPath));

module.exports = app;
