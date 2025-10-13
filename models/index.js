const mongoose = require('mongoose');

const User = require('./User');
const Room = require('./Room');
const Slot = require('./Slot');
const RoomBooking = require('./RoomBooking');

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
