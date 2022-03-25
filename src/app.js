require("./config/Database");
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New Socket Connection");
});

app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = server;
