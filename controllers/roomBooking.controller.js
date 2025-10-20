const db = require('../models');
const RoomBooking = db.roombookings;

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
    }
}