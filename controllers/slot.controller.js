const { get } = require('mongoose');
const db = require('../models');

const Slot = db.slots;

module.exports = {
    //get all slots
    getAllSlots: async (req, res) => {
        try {
            const slots = await Slot.find({});
            // console.log("slots:", slots);
            
            res.status(200).json(slots);
        } catch (error) {
            console.error('Error fetching slots:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // get slot by id
    getSlotById: async (req, res) => {
        try {
            const { id } = req.params;
            const slot = await Slot.findById(id);
            if (!slot) {
                return res.status(404).json({ error: 'Slot not found' });
            }
            res.status(200).json(slot);
        } catch (error) {
            console.error('Error fetching slot:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};