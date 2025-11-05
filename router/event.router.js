const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/:eventId/join", eventController.joinEvent);
router.post("/:eventId/leave", eventController.leaveEvent);
module.exports = router;
