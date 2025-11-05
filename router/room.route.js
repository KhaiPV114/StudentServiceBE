const express = require('express');
const roomRouter = express.Router();
const { RoomController } = require('../controllers');

// Route to get all rooms
roomRouter.get('/', RoomController.getAllRooms);
roomRouter.get("/availability/:location/:slotId/:date", RoomController.getRoomAvailability);

module.exports = roomRouter;