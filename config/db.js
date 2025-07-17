const mongoose = require('mongoose');
const log = require('../middleware/logger');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/urlShortener', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
    log("database", "info", "db", "MongoDB connected successfully");
  } catch (error) {
    console.error('❌ DB Connection Error:', error.message);
    log("database", "error", "db", `MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
