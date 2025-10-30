const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // nhân viên xử lý
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["maintenance", "suggestion", "feedback"],
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved", "closed"],
    default: "pending",
  },
  rating: { type: Number, min: 1, max: 5 },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
