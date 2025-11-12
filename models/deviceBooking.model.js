const mongoose = require("mongoose");

const deviceBookingSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  borrowDate: { type: Date, required: true }, 
  dueDate: {type: Date, required: true},
  reply: {type: String, required: true},
  status: { type: String, enum: ["BOOKED", "CANCELLED", "PENDING"], default: "BOOKED" },
});

const DeviceBooking = mongoose.model("DeviceBooking", deviceBookingSchema, "deviceBookings")

module.exports = DeviceBooking