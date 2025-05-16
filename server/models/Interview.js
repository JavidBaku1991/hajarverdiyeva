const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  language: {
    type: String,
    enum: ['az', 'ru', 'en'],
    default: 'az'
  }
});

module.exports = mongoose.model('Interview', interviewSchema); 