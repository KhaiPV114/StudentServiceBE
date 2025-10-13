const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;
