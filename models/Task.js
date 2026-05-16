const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: String,

  assignedTo: String,

  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },

  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },

  dueDate: Date,

}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
