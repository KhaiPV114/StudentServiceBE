const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema con cho phản hồi
const ResponseSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',  // Ai trả lời
    required: true 
  },
  message: { 
    type: String, 
    required: true, 
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Schema chính cho Helpdesk
const HelpdeskSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',   // Ai tạo ticket
    required: true 
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    enum: ['GENERAL', 'TECHNICAL', 'ACCESS', 'OTHER'],
    default: 'GENERAL'
  },
  status: { 
    type: String, 
    enum: ['NEW', 'IN_PROGRESS', 'RESOLVED'], 
    default: 'NEW' 
  },
  createdAt: { type: Date, default: Date.now },

  // Danh sách phản hồi
  responses: [ResponseSchema]
});

module.exports = mongoose.model('Helpdesk', HelpdeskSchema, 'helpdesks');
