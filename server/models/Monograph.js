const mongoose = require('mongoose');

const monographSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Monograph', monographSchema); 