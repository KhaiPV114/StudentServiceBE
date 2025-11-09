const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  type: { 
    type: String, 
    enum: ["club_event", "workshop", "sports", "career_fair"], // thêm career_fair
    required: true 
  },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  capacity: Number,
  status: { 
    type: String, 
    enum: ["upcoming", "finished", "cancelled"], 
    default: "upcoming" 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
