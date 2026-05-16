const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },

  category: {
    type: String,
    enum: ['material', 'labor', 'equipment'],
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  vendor: String,

  notes: String,

  receiptImages: [String],

  expenseDate: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });

module.exports = mongoose.model(
  'Expense',
  expenseSchema,
);