const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  bio: {                    // ⭐ ADD THIS FIELD
    type: String,
    default: ''
  },
  
  moodHistory: [{
    emotion: String,
    intensity: Number,
    note: String,
    timestamp: Date
  }],
  
  journalEntries: [{
    text: String,
    timestamp: Date,
    date: String,
    time: String
  }],
  
  goals: [{
    text: String,
    completed: Boolean,
    createdAt: Date
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);