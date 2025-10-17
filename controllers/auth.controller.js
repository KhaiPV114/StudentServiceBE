
const db = require('../models');
const bcrypt = require('bcryptjs');

const User = db.users;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, email, password, avatar } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const newUser = new User({ name, email, password, avatar });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            next(error);
        }
    }
}