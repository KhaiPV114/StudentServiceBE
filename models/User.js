const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [6, "Fullname must be at least 6 characters"],
      maxLength: [50, "Full name must be at most 50 characters"],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: [true, "Email already exists"],
    },
    avatar: { type: String },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["STUDENT", "STAFF", "ADMIN"],
      default: "STUDENT",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BANNED",],
      default: "ACTIVE",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: bookings made by user
userSchema.virtual('bookings', {
  ref: 'RoomBooking',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
});


userSchema.methods.isValidPassword = async function (password) {
    try{
        return await bcryptjs.compare(password, this.password)
    }
    catch (error) {
        throw error
    }
}



const User = mongoose.model("User", userSchema, "users ");

module.exports = User;
