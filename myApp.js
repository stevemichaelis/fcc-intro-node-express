var express = require("express");
var app = express();

console.log("Hello World");

const indexPath = __dirname + "/views/index.html";

app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (res, req) => {
  res.json({
    message: "Hello json"
  });
});
module.exports = app;
