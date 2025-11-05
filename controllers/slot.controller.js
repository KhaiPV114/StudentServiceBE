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
    }
};