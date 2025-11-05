const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotNumber: { type: Number, required: true },
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const Slot = mongoose.model("Slot", slotSchema, "slots");

module.exports = Slot;

//fake data
/*
[
    { "slotNumber": 1, "name": "Slot 1", "startTime": "07:30", "endTime": "09:50" },
  { "slotNumber": 2, "name": "Slot 2", "startTime": "10:00", "endTime": "12:20" },
  { "slotNumber": 3, "name": "Slot 3", "startTime": "12:50", "endTime": "15:10" },
  { "slotNumber": 4, "name": "Slot 4", "startTime": "15:20", "endTime": "17:40" },
] */
