const express = require('express');
const roomBookingRouter = express.Router();
const {RoomBookingController} = require('../controllers');

// Route to get all roomBookings
roomBookingRouter.get('/', RoomBookingController.getAllRoomBookings);

module.exports = roomBookingRouter;