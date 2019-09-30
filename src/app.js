// Console clear
process.stdout.write('\033c');
console.log(">\n> [Server] Starting Server\n>");

// Libraries
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
// Config
const config = require("./config/global.json");

// Database setup
mongoose.Promise = require("bluebird");
mongoose.connect(config.database.details.database, { // Connect to db
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((db) => {
  var host = db.connections[0].host;
  var port = db.connections[0].port;
  console.log("> [Database] Connection success. " + host + ":" + port);
}).catch((err) => {
  console.log("> [Database] Connection failed:");
  console.log(err);
});

// Port Setup
var listener = http.listen(process.env.PORT || config.main.port, () => {
  console.log("> [Server] Server started!");
});
