var express = require("express");
var app = express();

console.log("Hello World");

const indexPath = __dirname + "/views/index.html";
const cssPath = __dirname + "/public";

app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

app.get("/public", express.static(cssPath));

module.exports = app;
