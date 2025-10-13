const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotNumber: { type: Number, required: true },
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
})

const Slot = mongoose.model('Slot', slotSchema, "slots ");

module.exports = Slot;