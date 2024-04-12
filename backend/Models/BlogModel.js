const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String], // Array of strings
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'], // Custom validation for limiting the array length
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validation function to limit the array length
function arrayLimit(val) {
  return val.length <= 3;
}

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
