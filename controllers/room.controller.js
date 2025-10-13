
const db = require('../models');

const Room = db.rooms;


module.exports = {
    //get all rooms
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms, { message: "Rooms retrieved successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //get room by id

}