const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ["BOOKED", "CANCELLED"], default: "BOOKED" },
}, { timestamps: true });

const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema, "roombookings");

module.exports = RoomBooking;
