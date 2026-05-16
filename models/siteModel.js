const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: String,
  location: String,
  userId: String,
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);
