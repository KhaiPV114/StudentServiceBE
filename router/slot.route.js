const express = require('express');
const slotRouter = express.Router();
// const { SlotController } = require('../controllers');
const SlotController = require('../controllers/slot.controller');

// Route to get all slots
slotRouter.get('/', SlotController.getAllSlots);

module.exports = slotRouter;