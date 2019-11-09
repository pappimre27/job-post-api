const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactUser: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Job', JobSchema);
