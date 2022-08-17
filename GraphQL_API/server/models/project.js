const mongoose = require('mongoose');

module.exports = mongoose.model('Project', new mongoose.Schema({
    title: String,
    weight: Number,
    description: String,
  })
);

