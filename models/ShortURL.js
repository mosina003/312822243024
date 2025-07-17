const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  location: String, 
});

const shortURLSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  clicks: [clickSchema],
});

module.exports = mongoose.model("ShortURL", shortURLSchema);
