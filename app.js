const express = require('express');
const AuthRoute = require("./routes/authRoute");
const NewsRoute = require("./routes/newsRoute");
const server = express();

server.use(express.json());

server.use("/users", AuthRoute);
server.use("/news", NewsRoute);

module.exports = server;