const express = require("express");
let request = require("request"); // "Request" library
let bodyParser = require("body-parser");
let querystring = require("querystring");
const path = require("path");

const app = express();

let accessToken;

let generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

// Serve the static files from the React app
app
  .use(express.static(path.join(__dirname, "client/build")))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

app.post("/api/callback", (req, res) => {
  console.log("Here", req.body.accessToken);
  accessToken = req.body.accessToken;
  res.end("Success");
});

app.get("/api/top_artists", (req, res) => {
  console.log("Here2", accessToken);

  let options = {
    url: "https://api.spotify.com/v1/me/top/artists",
    headers: { Authorization: "Bearer " + accessToken },
    json: true
  };

  request.get(options, (error, response, body) => {
    res.status(200).json(response.body.items);
  });
});
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.tsx"));
});

const port = process.env.PORT || 8888;
app.listen(port);

console.log("App is listening on port " + port);
