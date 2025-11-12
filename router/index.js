const express = require('express');
const createError = require('http-errors');


const router = express.Router();
const roomRouter = require('./room.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const roomBookingRouter = require('./roomBooking.route');
const eventRouter = require("./event.router")
const ticketRouter = require("./ticket.router");
const slotRouter = require('./slot.route');
const feedbackRouter = require('./feedback.route')
const deviceRouter = require('./device.route')
const deviceBookingRouter = require('./deviceBooking.route')

// Routes
router.use('/rooms', roomRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter); // Authentication
router.use('/roombookings', roomBookingRouter)
router.use("/events", eventRouter)
router.use("/tickets", ticketRouter)
router.use("/slots", slotRouter)
router.use("/feedbacks", feedbackRouter)
router.use("/devices", deviceRouter)
router.use('/deviceBookings', deviceBookingRouter)



// Handle 404 (if not matched any route)
router.use((req, res, next) => {
    next(createError.NotFound());
});

module.exports =  router;

