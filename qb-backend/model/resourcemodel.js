const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: String,
    tags: [String],
  }, { timestamps: true });

module.exports = mongoose.model('Resource',resourceSchema)