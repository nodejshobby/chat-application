require("./config/Database");
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");
const flash = require("connect-flash");
const localizeFlash = require("./utils/localizeFlash");
const sessionConfig = require("./config/sessionConfig");
const passport = require("passport");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("tiny"));
app.use(cors());
app.use(sessionConfig);
app.use(flash());
app.use(localizeFlash);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New Socket Connection");

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = server;
