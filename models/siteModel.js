const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
 
  userId: String,
   name: String,
  clientName: String,
  locationName: String,
  budget: Number,
  startDate: Date,
  targetEndDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);
