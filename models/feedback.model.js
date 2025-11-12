const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
  responderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

const FeedbackSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roomBookingId: { type: Schema.Types.ObjectId, ref: 'RoomBooking' },
  deviceBookingId:  { type: Schema.Types.ObjectId, ref: 'DeviceBooking' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
  replies: { type: [ReplySchema], default: [] },
  status: { type: String, enum: ['ACTIVE','INACTIVE'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema, 'feedbacks');
