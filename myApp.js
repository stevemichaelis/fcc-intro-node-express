// * Back End Development and APIs
// * Basic Node and Express
// https://www.freecodecamp.org/learn/back-end-development-and-apis#basic-node-and-express

// * 06 Use the .env File
require("dotenv").config();

const { time } = require("console");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// * 07 Implement a Root-Level Request Logger Middleware
// logs which method on which path by which ip was used for every following request.
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// * 10 Use body-parser to Parse POST Request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * 08 Chain Middleware to Create a Time Server
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    return res.json({ time: req.time });
  }
);


// * 01 Meet the Node console
console.log("Hello World");

// * 03 Serve an HTML File
const indexPath = __dirname + "/views/index.html";
app.get("/", function (req, res) {
  res.sendFile(indexPath);
});

// * 04 Serve Static Assets
// * 06 Use the .env File
// serves the stylsheet defined in index.html
app.use("/public", express.static(__dirname + "/public"));

// * 05 Serve JSON on a Specific Route
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

// * 09 Get Route Parameter Input from the Client
// When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the req.params object.

// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}
// *TASK: Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.

app.get(
  "/:word/echo",
  (req, res, next) => {
    word = req.params.word;
    next();
  },
  (req, res) => {
    res.json({ echo: word });
  }
);

// * 10 Get Query Parameter Input from the Client
// Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}
// *Task Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}. The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.

// Note: In the following exercise you are going to receive data from a POST request, at the same /name route path. If you want, you can use the method app.route(path).get(handler).post(handler). This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.


// Solution one:
/* app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  // OR you can destructure and rename the keys
  // const { first: firstName, last: lastName } = req.query;

  res.json({ name: firstName + " " + lastName });
}); */

// Solution two: app.route(PATH).get(HANDLER).post(HANDLER)
app
  .route("/name")
  .get((req, res) => {
    // let firstName = req.query.first; 
    // let lastName = req.query.last;
    const { first: firstName, last: lastName} = req.query; 
    res.json({ name: `${firstName} ${lastName}` });
  })
  .post();


// * 11 Get Data from POST Requests
app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  console.log(firstName);
  res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;
