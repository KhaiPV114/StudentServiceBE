const mongoose = require("mongoose")

const deviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity:{type: Number, required: true},
    status: {type: String, enum:["HET", "CON"]}
})

const Device = mongoose.model("Device", deviceSchema, "devices")

module.exports = Device