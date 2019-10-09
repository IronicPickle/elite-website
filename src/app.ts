clearWindow();

import express from "express";
import http from "http";
import dotenv from "dotenv";

const env = dotenv.config(); // Pull env vars from ' .env ' file
if(env.error) console.log("No environment file, using defaults");

const app = express(); // Initialise express
const server = new http.Server(app);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("Listening on:", port);
});

app.use("*", (req, res, next) => {
  console.log(req.method, req.path, "from", req.ip);
});




function clearWindow() {
  console.log("\u001b[2J\u001b[0;0H");
}
