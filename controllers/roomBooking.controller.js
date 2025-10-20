const db = require('../models');
const RoomBooking = db.roombookings;
const Room = db.rooms;
const User = db.users;
const Slot = db.slots;

module.exports = {
    //get all room bookings
    getAllRoomBookings: async (req,res) =>{
        try {
            const roomBookings = await RoomBooking.find()
            .populate('roomId', "name location")
            .populate('userId', "name email")
            .populate('slotId', "startTime endTime")
            res.status(200).json(roomBookings, {message: "Room bookings retrieved successfully"})
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // GET booking by ID
  getRoomBookingById: async (req, res) => {
    try {
      const booking = await RoomBooking.findById(req.params.id)
        .populate("userId", "name email role")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      if (!booking)
        return res.status(404).json({ success: false, message: "Booking not found" });

      res.status(200).json({ success: true, data: booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // CREATE new booking
  createRoomBooking: async (req, res) => {
    try {
      const { userId, roomId, slotId, date } = req.body;

      // Check if booking already exists for same room/slot/date
      const existing = await RoomBooking.findOne({ roomId, slotId, date, status: "BOOKED" });
      if (existing)
        return res.status(400).json({ success: false, message: "This room and slot is already booked for this date" });

      const newBooking = await RoomBooking.create({ userId, roomId, slotId, date });

      const populatedBooking = await RoomBooking.findById(newBooking._id)
        .populate("userId", "name email role")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      res.status(201).json({ success: true, data: populatedBooking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // CANCEL booking
  cancelRoomBooking: async (req, res) => {
    try {
      const booking = await RoomBooking.findById(req.params.id);
      if (!booking)
        return res.status(404).json({ success: false, message: "Booking not found" });

      booking.status = "CANCELLED";
      await booking.save();

      res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
}