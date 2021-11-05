var express = require("express");
var app = express();

console.log("Hello World");

const indexPath = __dirname + "/views/index.html";

app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

module.exports = app;
