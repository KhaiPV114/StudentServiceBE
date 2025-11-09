const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  date: { type: Date, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ["BOOKED", "CANCELLED", "PENDING"], default: "BOOKED" },
}, { timestamps: true });

const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema, "roombookings");

module.exports = RoomBooking;


/*
[
  {
    "roomId": "671f12c5e31fbc7b57b1a001",
    "userId": "68f60fccaa7daa5e918db749",
    "slotId": "671f12c5e31fbc7b57b1a010",
    "date": "2025-11-01T00:00:00.000Z",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a002",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a011",
    "date": "2025-11-01T00:00:00.000Z",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a003",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a012",
    "date": "2025-11-01T00:00:00.000Z",
    "status": "CANCELLED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a004",
    "userId": "68fe7b81f72f0ed2eace268c",
    "slotId": "671f12c5e31fbc7b57b1a013",
    "date": "2025-11-02T00:00:00.000Z",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a005",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a014",
    "date": "2025-11-03T00:00:00.000Z",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a006",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a015",
    "date": "2025-11-04T00:00:00.000Z",
    "status": "BOOKED"
  }
]


*/ 