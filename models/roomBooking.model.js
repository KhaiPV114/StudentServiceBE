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


/*
[
  {
    "roomId": "671f12c5e31fbc7b57b1a001",
    "userId": "68f60fccaa7daa5e918db749",
    "slotId": "671f12c5e31fbc7b57b1a010",
    "date": "2025-11-01",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a002",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a011",
    "date": "2025-11-01",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a003",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a012",
    "date": "2025-11-01",
    "status": "CANCELLED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a004",
    "userId": "68fe7b81f72f0ed2eace268c",
    "slotId": "671f12c5e31fbc7b57b1a013",
    "date": "2025-11-02",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a005",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a010",
    "date": "2025-11-02",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a006",
    "userId": "68f60fccaa7daa5e918db749",
    "slotId": "671f12c5e31fbc7b57b1a011",
    "date": "2025-11-02",
    "status": "CANCELLED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a007",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a012",
    "date": "2025-11-03",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a008",
    "userId": "68fe7b81f72f0ed2eace268c",
    "slotId": "671f12c5e31fbc7b57b1a013",
    "date": "2025-11-03",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a009",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a010",
    "date": "2025-11-03",
    "status": "CANCELLED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00a",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a011",
    "date": "2025-11-04",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00b",
    "userId": "68f60fccaa7daa5e918db749",
    "slotId": "671f12c5e31fbc7b57b1a012",
    "date": "2025-11-04",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00c",
    "userId": "68fe7b6bf72f0ed2eace2689",
    "slotId": "671f12c5e31fbc7b57b1a013",
    "date": "2025-11-04",
    "status": "CANCELLED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00d",
    "userId": "68fe7b81f72f0ed2eace268c",
    "slotId": "671f12c5e31fbc7b57b1a010",
    "date": "2025-11-05",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00e",
    "userId": "68f6103bfd97352349bb6b48",
    "slotId": "671f12c5e31fbc7b57b1a011",
    "date": "2025-11-05",
    "status": "BOOKED"
  },
  {
    "roomId": "671f12c5e31fbc7b57b1a00f",
    "userId": "68f60fccaa7daa5e918db749",
    "slotId": "671f12c5e31fbc7b57b1a012",
    "date": "2025-11-05",
    "status": "BOOKED"
  }
]
*/ 