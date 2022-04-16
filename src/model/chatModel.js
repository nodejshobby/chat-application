const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Message", userSchema);

module.exports = chatModel;
