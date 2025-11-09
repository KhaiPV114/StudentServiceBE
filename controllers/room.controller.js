const db = require("../models");
const mongoose = require("mongoose");

const Room = db.rooms;
const RoomBooking = db.roombookings;

module.exports = {
  //get all rooms
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms, { message: "Rooms retrieved successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //get room by id
  getRoomById: async (req, res, next) => {
    try {
      const { id } = req.param;
      const room = await Room.find({ _id: id });

      if (!room) {
        return res.status(400).send("Room is not existed!");
      }

      res.status(200).json(room);
    } catch (error) {
      next();
    }
  },

  //get room availability
  getRoomAvailability: async (req, res) => {
    try {
      const { location, slotId, date } = req.params;

      if (!location || !slotId || !date) {
        return res.status(400).json({
          success: false,
          message: "Location, slotId and date are required as params",
        });
      }

      // Lấy toàn bộ phòng ở location đó
      const roomsAtLocation = await Room.find({ location }).lean();

      // Lấy tất cả booking để lọc
      const allBookings = await RoomBooking.find().lean();

      // Lấy danh sách roomId đã bị BOOKED trong ngày và slot đó
      const bookedRoomIds = allBookings
        .filter((b) => {
          const dbDate = new Date(b.date).toISOString().split("T")[0];
          return (
            dbDate === date &&
            String(b.slotId) === String(slotId) &&
            (b.status === "BOOKED" || b.status === "PENDING")
          );
        })
        .map((b) => String(b.roomId));

      // Lọc ra các phòng chưa bị book
      const availableRooms = roomsAtLocation.filter(
        (room) => !bookedRoomIds.includes(String(room._id))
      );

      return res.status(200).json(
        availableRooms
      );
    } catch (err) {
      console.error("Error in getRoomAvailability:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};
