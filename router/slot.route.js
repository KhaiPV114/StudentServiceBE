const express = require('express');
const slotRouter = express.Router();
// const { SlotController } = require('../controllers');
const SlotController = require('../controllers/slot.controller');

// Route to get all slots
slotRouter.get('/', SlotController.getAllSlots);
//get slot by id
slotRouter.get('/:id', SlotController.getSlotById);

module.exports = slotRouter;