
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
}