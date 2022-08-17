const mongoose = require('mongoose');

module.exports = mongoose.model('Task', new mongoose.Schema({
    title: String,
    weight: Number,
    description: String,
    projectId: String,
  })
);

