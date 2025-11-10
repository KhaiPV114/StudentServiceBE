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
// Route to check duplicate booking / availability
roomBookingRouter.get('/check', RoomBookingController.checkDuplicateBooking);
// Route for staff to approve a booking
roomBookingRouter.post('/:id/approve', RoomBookingController.approveBooking);
// Route for staff to reject a booking
roomBookingRouter.post('/:id/reject', RoomBookingController.rejectBooking);
//get bookings by slotId
roomBookingRouter.get('/slot/:slotId', RoomBookingController.getRoomBookingsBySlotId);
//get by userID
roomBookingRouter.get('/:userId/user', RoomBookingController.getRoomBookingByUserId)

module.exports = roomBookingRouter;