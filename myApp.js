require("dotenv").config();
var express = require("express");
var app = express();

console.log("Hello World");

const indexPath = __dirname + "/views/index.html";

app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "Hello json".toUpperCase(),
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

module.exports = app;
