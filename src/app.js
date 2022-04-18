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
const Message = require("./utils/Messages");
const Chat = require("./model/chatModel");

const {
  userJoinRoom,
  getCurrentRoomUser,
  getAllRoomUsers,
  userLeaveRoom,
} = require("./utils/activeRoomUser");

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
  //Catch the event join room
  socket.on("joinRoom", ({ user, roomID }) => {
    const inRoomUser = userJoinRoom(socket.id, user, roomID);
    socket.join(inRoomUser.roomID);

    // Send a welcome message to user
    socket.emit(
      "chat",
      Message.formatMessage(
        process.env.chatAppName,
        "Welcome to chatter web application"
      )
    );

    //Send the notification that a user just join
    socket.broadcast
      .to(inRoomUser.roomID)
      .emit(
        "chat",
        Message.formatMessage(
          process.env.chatAppName,
          `${user} just join the chat`
        )
      );
    // Send room users in room
    io.to(roomID).emit("roomUsers", getAllRoomUsers(roomID));
  });

  //Send a message when a user just leave the chat
  socket.on("disconnect", () => {
    const user = userLeaveRoom(socket.id);
    if (user) {
      io.to(user.roomID).emit(
        "chat",
        Message.formatMessage(
          process.env.chatAppName,
          `${user.username} just left the chat`
        )
      );

      io.to(user.roomID).emit("roomUsers", getAllRoomUsers(user.roomID));
    }
  });

  //Listen when a user send message
  socket.on("sendMessage", (msg) => {
    const user = getCurrentRoomUser(socket.id);
    const wrapMessage = Message.formatMessage(user.username, msg);
    io.to(user.roomID).emit("chat", wrapMessage);

    Chat({
      roomId: user.roomID,
      username: user.username,
      message: msg,
      time: wrapMessage.time,
    }).save((err, result) => {
      if (err) return err;
    });
  });
});

app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = server;
