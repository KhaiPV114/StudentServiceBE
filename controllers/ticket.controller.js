const Ticket = require("../models/ticket.model");

// Tạo ticket (yêu cầu hỗ trợ)
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả ticket
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("userId", "name email")
      .populate("staffId", "name email");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết ticket
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật ticket
exports.updateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTicket) return res.status(404).json({ message: "Ticket not found" });
    res.json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
