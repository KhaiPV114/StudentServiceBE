const mongoose = require("mongoose");
const db = require("../models");

const DeviceBooking = db.devicebookings
const Device = db.devices
const Users = db.users

module.exports = {
  getAllDeviceBookings: async (req, res) => {
    try {
      const bookings = await DeviceBooking.find()
        .populate("deviceId", "name type status")
        .populate("userId", "name email role")
        .sort({ borrowDate: -1 });

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching device bookings", error });
    }
  },

  getDeviceBookingsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(400).json({ message: "Invalid user ID" });

      const bookings = await DeviceBooking.find({ userId })
        .populate("deviceId", "name type status")
        .populate("userId", "name email");

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user's device bookings", error });
    }
  },

  getDeviceBookingsByDevice: async (req, res) => {
    try {
      const { deviceId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(deviceId))
        return res.status(400).json({ message: "Invalid device ID" });

      const bookings = await DeviceBooking.find({ deviceId })
        .populate("deviceId", "name type status")
        .populate("userId", "name email");

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching device bookings by device", error });
    }
  },

  createDeviceBooking: async (req, res) => {
    try {
      const { deviceId, userId, borrowDate, dueDate, reply } = req.body;

      if (!deviceId || !userId || !borrowDate || !dueDate || !reply) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newBooking = new DeviceBooking({
        deviceId,
        userId,
        borrowDate,
        dueDate,
        reply,
      });

      await newBooking.save();
      res.status(201).json({ message: "Device booking created successfully", newBooking });
    } catch (error) {
      res.status(500).json({ message: "Error creating device booking", error });
    }
  },

  updateDeviceBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const booking = await DeviceBooking.findByIdAndUpdate(id, updates, { new: true });
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (error) {
      res.status(500).json({ message: "Error updating device booking", error });
    }
  },

  deleteDeviceBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await DeviceBooking.findByIdAndDelete(id);
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting device booking", error });
    }
  },

  updateBookingStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["BOOKED", "CANCELLED", "PENDING"].includes(status))
        return res.status(400).json({ message: "Invalid status value" });

      const booking = await DeviceBooking.findByIdAndUpdate(id, { status }, { new: true });
      if (!booking) return res.status(404).json({ message: "Booking not found" });

      res.status(200).json({ message: "Booking status updated", booking });
    } catch (error) {
      res.status(500).json({ message: "Error updating booking status", error });
    }
  },
};
