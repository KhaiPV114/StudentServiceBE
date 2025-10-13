const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    role: { type: String},
    status: { type: String, default: 'active' },
}, { timestamps: true})

const User = mongoose.model('User', userSchema, "users ");

module.exports = User;
    