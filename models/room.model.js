const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room's name is required"],
      unique: true,
    },
    location: {
      type: String,
      enum: ["ALPHA", "BETA", "DELTA"],
      required: [true, "Room's location is required"],
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;

//fake data
/*
[
  { "name": "DE01", "location": "DELTA" },
  { "name": "DE02", "location": "DELTA" },
  { "name": "DE03", "location": "DELTA" },
  { "name": "DE04", "location": "DELTA" },
  { "name": "DE05", "location": "DELTA" },
  { "name": "DE06", "location": "DELTA" },
  { "name": "DE07", "location": "DELTA" },
  { "name": "DE08", "location": "DELTA" },
  { "name": "DE09", "location": "DELTA" },
  { "name": "DE10", "location": "DELTA" },
  { "name": "DE11", "location": "DELTA" },
  { "name": "DE12", "location": "DELTA" },
  { "name": "DE13", "location": "DELTA" },
  { "name": "DE14", "location": "DELTA" },
  { "name": "DE15", "location": "DELTA" },
  { "name": "BE01", "location": "BETA" },
  { "name": "BE02", "location": "BETA" },
  { "name": "BE03", "location": "BETA" },
  { "name": "BE04", "location": "BETA" },
  { "name": "BE05", "location": "BETA" },
  { "name": "BE06", "location": "BETA" },
  { "name": "BE07", "location": "BETA" },
  { "name": "BE08", "location": "BETA" },
  { "name": "BE09", "location": "BETA" },
  { "name": "BE10", "location": "BETA" },
  { "name": "BE11", "location": "BETA" },
  { "name": "BE12", "location": "BETA" },
  { "name": "BE13", "location": "BETA" },
  { "name": "BE14", "location": "BETA" },
  { "name": "BE15", "location": "BETA" },
  { "name": "AL01", "location": "ALPHA" },
  { "name": "AL02", "location": "ALPHA" },
  { "name": "AL03", "location": "ALPHA" },
  { "name": "AL04", "location": "ALPHA" },
  { "name": "AL05", "location": "ALPHA" },
  { "name": "AL06", "location": "ALPHA" },
  { "name": "AL07", "location": "ALPHA" },
  { "name": "AL08", "location": "ALPHA" },
  { "name": "AL09", "location": "ALPHA" },
  { "name": "AL10", "location": "ALPHA" },
  { "name": "AL11", "location": "ALPHA" },
  { "name": "AL12", "location": "ALPHA" },
  { "name": "AL13", "location": "ALPHA" },
  { "name": "AL14", "location": "ALPHA" },
  { "name": "AL15", "location": "ALPHA" }
]
*/
