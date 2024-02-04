// models/File.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  data: Buffer,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
