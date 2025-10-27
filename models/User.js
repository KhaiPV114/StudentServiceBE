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
  { timestamps: true }
);


userSchema.methods.isValidPassword = async function (password) {
    try{
        return await bcryptjs.compare(password, this.password)
    }
    catch (error) {
        throw error
    }
}



const User = mongoose.model("User", userSchema, "users");

module.exports = User;


/*
[
  {
  "_id": {
    "$oid": "68f60fccaa7daa5e918db749"
  },
  "name": "chinh hoang",
  "email": "chinh123@gmail.com",
  "password": "$2b$10$M9upFFW8EnQkpWtys8hyReaG4TLcrNVIL8AisSSb8m5R.20CFddQu",
  "role": "STUDENT",
  "status": "ACTIVE",
  "createdAt": {
    "$date": "2025-10-20T10:32:44.824Z"
  },
  "updatedAt": {
    "$date": "2025-10-20T10:32:44.824Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "68f6103bfd97352349bb6b48"
  },
  "name": "Đoàn Mạnh Dương",
  "email": "duong345@gmail.com",
  "password": "$2b$10$4QbVShHlq5f9TD7FcKRuU.oiJJdYVDRSOCNrrbh.40JqPiniqUycy",
  "role": "STUDENT",
  "status": "ACTIVE",
  "createdAt": {
    "$date": "2025-10-20T10:34:35.344Z"
  },
  "updatedAt": {
    "$date": "2025-10-20T10:34:35.344Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "68fe7b6bf72f0ed2eace2689"
  },
  "name": "Phan Tuan Anh",
  "email": "tuananh123@gmail.com",
  "password": "$2b$10$K2xPqSb.PAWyNWvbchf5FeETypaONmacvu23DRGEwZtedCFoiEcRC",
  "role": "STUDENT",
  "status": "ACTIVE",
  "createdAt": {
    "$date": "2025-10-26T19:50:03.072Z"
  },
  "updatedAt": {
    "$date": "2025-10-26T19:50:03.072Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "68fe7b81f72f0ed2eace268c"
  },
  "name": "Duong Trong Nghia",
  "email": "trongnghia123@gmail.com",
  "password": "$2b$10$7F1fmq3VRZLwizcKvsKsUuOglDaVnR4kgOENH3Vqfjr5oO06rH3Ea",
  "role": "STUDENT",
  "status": "ACTIVE",
  "createdAt": {
    "$date": "2025-10-26T19:50:25.373Z"
  },
  "updatedAt": {
    "$date": "2025-10-26T19:50:25.373Z"
  },
  "__v": 0
}
]
*/