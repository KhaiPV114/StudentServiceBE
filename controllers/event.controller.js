const Event = require("../models/event.model");
const mongoose = require("mongoose");
// Tạo sự kiện
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả sự kiện
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizerId", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết sự kiện
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("participants", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sự kiện
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa sự kiện
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userIdStr = userId.toString();

    // Kiểm tra xem user đã tham gia chưa
    if (event.participants.map(p => p.toString()).includes(userIdStr)) {
      return res.status(400).json({ message: "User already joined this event" });
    }

    // Kiểm tra giới hạn số lượng
    if (event.capacity && event.participants.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Thêm userId vào participants
    event.participants.push(new mongoose.Types.ObjectId(userId));
    await event.save();

    // Populate participants để trả về thông tin người dùng
    await event.populate("participants", "name email");

    res.json({ message: "Joined event successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// Rời khỏi sự kiện
// ==========================
exports.leaveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const userIdStr = userId.toString();

    // Kiểm tra xem user đã tham gia chưa
    if (!event.participants.map(p => p.toString()).includes(userIdStr)) {
      return res.status(400).json({ message: "User has not joined this event" });
    }

    // Loại bỏ userId khỏi participants
    event.participants = event.participants.filter(p => p.toString() !== userIdStr);
    await event.save();

    // Populate participants để trả về thông tin người dùng
    await event.populate("participants", "name email");

    res.json({ message: "Left event successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

