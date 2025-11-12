const { Feedback, User, Room } = require('../models');

module.exports = {
  createFeedback: async (req, res) => {
    try {
      const { userId, roomId, rating, comment } = req.body;
      if (!userId || !rating) {
        return res.status(400).json({ success: false, message: 'userId and rating are required' });
      }

      const fb = await Feedback.create({ userId, roomId, rating, comment });
      await fb.populate('userId', 'name email').populate('roomId', 'name location').execPopulate?.() || await fb.populate([{ path: 'userId', select: 'name email' }, { path: 'roomId', select: 'name location' }]);
      return res.status(201).json({ success: true, data: fb });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  getAllFeedback: async (req, res) => {
    try {
      const { page = 1, limit = 50, status } = req.query;
      const filter = {};
      if (status) filter.status = status;
      const feedbacks = await Feedback.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('userId', 'name email')
        .populate('roomId', 'name location')
        .populate('replies.responderId', 'name email');
      return res.status(200).json({ success: true, data: feedbacks });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  getFeedbackById: async (req, res) => {
    try {
      const { id } = req.params;
      const fb = await Feedback.findById(id)
        .populate('userId', 'name email')
        .populate('roomId', 'name location')
        .populate('replies.responderId', 'name email');
      if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });
      return res.status(200).json({ success: true, data: fb });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  getFeedbackByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const feedbacks = await Feedback.find({ userId })
        .sort({ createdAt: -1 })
        .populate('roomId', 'name location')
        .populate('replies.responderId', 'name email');
      if (!feedbacks || feedbacks.length === 0) {
        return res.status(404).json({ success: false, message: 'No feedback found for this user' });
      }
      return res.status(200).json({ success: true, data: feedbacks });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  addReply: async (req, res) => {
    try {
      const { id } = req.params; // feedback id
      const { responderId, message } = req.body;
      if (!responderId || !message) {
        return res.status(400).json({ success: false, message: 'responderId and message are required' });
      }

      const fb = await Feedback.findById(id);
      if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });

      fb.replies.push({ responderId, message });
      await fb.save();
      const populated = await Feedback.findById(id).populate('replies.responderId', 'name email').populate('userId', 'name email').populate('roomId', 'name location');
      return res.status(200).json({ success: true, data: populated });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  deleteReply: async (req, res) => {
    try {
      const { id, replyId } = req.params; // id = feedback id
      const fb = await Feedback.findById(id);
      if (!fb) return res.status(404).json({ success: false, message: 'Feedback not found' });

      const idx = fb.replies.findIndex(r => r._id.toString() === replyId);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Reply not found' });

      fb.replies.splice(idx, 1);
      await fb.save();
      return res.status(200).json({ success: true, message: 'Reply deleted' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  deleteFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Feedback.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Feedback not found' });
      return res.status(200).json({ success: true, message: 'Deleted' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};