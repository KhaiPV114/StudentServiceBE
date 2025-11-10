const db = require("../models");
const RoomBooking = db.roombookings;
const Room = db.rooms;
const User = db.users;
const Slot = db.slots;

module.exports = {
  //get all room bookings
  getAllRoomBookings: async (req, res) => {
    try {
      const roomBookings = await RoomBooking.find()
        .populate("roomId", "name location")
        .populate("userId", "name email")
        .populate("slotId", "startTime endTime");

      res
        .status(200)
        .json(roomBookings, {
          message: "Room bookings retrieved successfully",
        });
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
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      res.status(200).json({ success: true, data: booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // get booking by slotId
  getRoomBookingsBySlotId: async (req, res) => {
    try {
      const { slotId } = req.params;

      const bookings = await RoomBooking.find({ slotId })
        .populate("userId", "name email")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      res.status(200).json({ success: true, data: bookings });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // CREATE new booking
  createRoomBooking: async (req, res) => {
    try {
      const { userId, roomId, slotId, date } = req.body;

      // Check if booking already exists for same room/slot/date
      const existing = await RoomBooking.findOne({
        roomId,
        slotId,
        date,
        status: "BOOKED",
      });
      if (existing)
        return res
          .status(400)
          .json({
            success: false,
            message: "This room and slot is already booked for this date",
          });

      const newBooking = await RoomBooking.create({
        userId,
        roomId,
        slotId,
        date,
        status: "PENDING",
      });

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
      console.log("id: " + req.params.id );
      
      const booking = await RoomBooking.findById(req.params.id);
      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      booking.status = "CANCELLED";
      await booking.save();

      res
        .status(200)
        .json({ success: true, message: "Booking cancelled successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
  // Approve booking (staff)
  approveBooking: async (req, res) => {
    try {
      const booking = await RoomBooking.findById(req.params.id);
      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      if (booking.status === "BOOKED")
        return res
          .status(400)
          .json({ success: false, message: "Booking already approved" });

      // Check conflict: can't approve if another APPROVED booking exists for same room/slot/date
      const conflict = await RoomBooking.findOne({
        _id: { $ne: booking._id },
        roomId: booking.roomId,
        slotId: booking.slotId,
        date: booking.date,
        status: "BOOKED",
      });
      if (conflict)
        return res
          .status(400)
          .json({
            success: false,
            message: "Another approved booking exists for this room/slot/date",
          });

      booking.status = "BOOKED";
      await booking.save();

      const populated = await RoomBooking.findById(booking._id)
        .populate("userId", "name email")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      return res.status(200).json({ success: true, data: populated });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // Reject booking (staff)
  rejectBooking: async (req, res) => {
    try {
      const booking = await RoomBooking.findById(req.params.id);
      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      if (booking.status === "CANCELLED")
        return res
          .status(400)
          .json({ success: false, message: "Booking already rejected" });

      booking.status = "CANCELLED";
      await booking.save();

      return res
        .status(200)
        .json({ success: true, message: "Booking rejected" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },



  // Check duplicate booking (availability)
  // Example: GET /roombookings/check?roomId=...&slotId=...&date=YYYY-MM-DD
  checkDuplicateBooking: async (req, res) => {
    try {
      const { roomId, slotId, date } = req.query;

      if (!roomId || !slotId || !date) {
        return res
          .status(400)
          .json({
            success: false,
            message: "roomId, slotId and date are required as query parameters",
          });
      }

      const existing = await RoomBooking.findOne({
        roomId,
        slotId,
        date,
        status: "BOOKED",
      })
        .populate("userId", "name email")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      if (existing) {
        return res
          .status(200)
          .json({ success: true, conflict: true, booking: existing });
      }

      return res.status(200).json({ success: true, conflict: false });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  //get roombooking by user 
  getRoomBookingByUserId: async (req, res) => {
    try {      
      const {userId} = req.params

      const booking = await RoomBooking.find({userId})
        .populate("userId", "name email role")
        .populate("roomId", "name location")
        .populate("slotId", "slotNumber name startTime endTime");

      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found111" });

      res.status(200).json( booking );
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  
};
