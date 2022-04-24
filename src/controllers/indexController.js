const mongoose = require("mongoose");
const Room = require("../model/roomModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const getIndexPage = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render("index", { rooms, userName: req.user.username });
  } catch (error) {
    console.log(error.message);
  }
};

const getChatPage = async (req, res) => {
  const roomId = req.query.roomID;
  const userName = req.query.user;
  if (!roomId || !mongoose.isValidObjectId(roomId) || !userName) {
    req.flash("error_message", "Invalid Request!");
    return res.redirect("/");
  }
  try {
    const room = await Room.findById(roomId);
    const user = await User.findOne({ username: userName });
    const chats = await Chat.find({
      roomId,
    });

    if (!room || !user) {
      req.flash("error_message", "Invalid Request!");
      return res.redirect("/");
    }
    res.render("chat", { userName, roomName: room.name, chats });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getIndexPage,
  getChatPage,
};
