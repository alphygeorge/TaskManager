const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", FileSchema);
