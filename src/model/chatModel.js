const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const chatModel = mongoose.model("Message", userSchema);

module.exports = chatModel;
