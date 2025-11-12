const RoomController = require('./room.controller');
const AuthController = require('./auth.controller');
const RoomBookingController = require('./roomBooking.controller');
const SlotController = require('./slot.controller');
const FeedbackController = require('./feedback.controller')
const DeviceController = require('./device.controller')
const DeviceBookingController = require("./deviceBooking.controller")

module.exports = {RoomController, AuthController, RoomBookingController, SlotController, DeviceController, DeviceBookingController};