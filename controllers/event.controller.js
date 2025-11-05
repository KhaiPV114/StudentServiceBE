const Event = require("../models/event.model");

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

// Tham gia sự kiện
exports.joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Kiểm tra nếu user đã tham gia
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "User already joined this event" });
    }

    // Nếu có giới hạn số lượng
    if (event.capacity && event.participants.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.participants.push(userId);
    await event.save();

    res.json({ message: "Joined event successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Rời khỏi sự kiện (hủy đăng ký)
exports.leaveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Kiểm tra nếu user chưa tham gia
    if (!event.participants.includes(userId)) {
      return res.status(400).json({ message: "User has not joined this event" });
    }

    // Xóa user khỏi danh sách participants
    event.participants = event.participants.filter(
      (id) => id.toString() !== userId
    );
    await event.save();

    res.json({ message: "Left event successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


