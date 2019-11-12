// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Home page to initiate the survey")
  res.sendFile(path.join(__dirname, "\\app\\public\\home.html"));
});

app.get("/survey", function(req, res) {
  // res.send("Survey page for the user")
  res.sendFile(path.join(__dirname, "\\app\\public\\survey2.html"));
});

// Displays all friends
app.get("/api/friends", function(req, res) {
  //Read friends.js and return the array
  const filePath = path.join(__dirname, "\\app\\data\\friends.js");
  try {
    friendsList = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(err);
  }
  return res.json(JSON.parse(friendsList));
});

// Saves a survey result, find match and return best match
app.post("/api/friends", function(req, res) {
  //Get data from request object
  userData = req.body;
  var friendsList = [];
  //Read existing data from friends.js
  try {
    friendsList = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(err);
  }
  friends = JSON.parse(friendsList);

  //For each friend, do the matching logic
  //friends.forEach(element => {

  //});

  //Get the best match

  //Save data to the friends.js in the data folder
  const filePath = path.join(__dirname, "\\app\\data\\friends.js");
  try {
    fs.writeFileSync(filePath, JSON.stringify(userData));
  } catch (err) {
    console.error(err);
  }

  // Return the best match - name and photo
  return res.json({
    name: "Madhuri",
    photo:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201905/madhuri.jpeg?3zWh7PupCa9eVqX_2h9mZ3XIYs70LHkG"
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
