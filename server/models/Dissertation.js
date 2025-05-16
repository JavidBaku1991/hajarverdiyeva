const mongoose = require('mongoose');

const dissertationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['az', 'en'],
    default: 'az'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dissertation', dissertationSchema); 