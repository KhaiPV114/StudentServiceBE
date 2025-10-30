const mongoose = require('mongoose');

const User = require('./user.model');
const Room = require('./room.model');
const Slot = require('./slot.model');
const RoomBooking = require('./roomBooking.model');
const Event = require("./event.model")
const Ticket = require("./ticket.model")

// Set mongoose Promise to global Promise
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = User;
db.rooms = Room;
db.slots = Slot;
db.roombookings = RoomBooking;


//connect to database
db.connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error: ", error.message);
      process.exit(1);
    });
};

module.exports = db;
