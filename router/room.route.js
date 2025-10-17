const express = require('express');
const roomRouter = express.Router();
const { RoomController } = require('../controllers');

// Route to get all rooms
roomRouter.get('/', RoomController.getAllRooms);



module.exports = roomRouter;