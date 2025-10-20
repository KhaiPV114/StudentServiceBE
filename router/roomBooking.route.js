const express = require('express');
const roomBookingRouter = express.Router();
const {RoomBookingController} = require('../controllers');

// Route to get all roomBookings
roomBookingRouter.get('/', RoomBookingController.getAllRoomBookings);
// Route to get roomBooking by ID
roomBookingRouter.get('/:id', RoomBookingController.getRoomBookingById);
// Route to create a new roomBooking
roomBookingRouter.post('/', RoomBookingController.createRoomBooking);
// Route to cancel a roomBooking
roomBookingRouter.delete('/:id', RoomBookingController.cancelRoomBooking);

module.exports = roomBookingRouter;