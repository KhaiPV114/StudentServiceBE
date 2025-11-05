
const db = require('../models');

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
            const {id} = req.param
            const room = await Room.find({_id: id});

            if(!room){
                return res.status(400).send("Room is not existed!")
            }

            res.status(200).json(room)

        } catch (error) {
            next()
        }
    },

    //get room availability
  getRoomAvailability: async (req, res) => {
    try {
      const { location, slotId, date } = req.params;

        const newDate = new Date(`${date}T00:00:00.000Z`);
        

      if (!location || !slotId || !date) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Location, slotId and date are required as query parameters",
          });
      }

      const rooms = await Room.find({
        location: location
      });

      const bookedRooms = await RoomBooking.find({
        slotId,
        date: newDate,
        status: "BOOKED",
      }).select("roomId");

      const bookedRoomIds = bookedRooms.map((booking) =>
        booking.roomId.toString()
      );

      const filteredRooms = rooms.filter(
        (room) => !bookedRoomIds.includes(room._id.toString())
      );

      return res.status(200).json({ success: true, data: filteredRooms });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
}