const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  workDone: String,
  workers: Number,
  notes: String,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
