

const mongoose = require("mongoose");

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
    validate: [arrayLimit, "{PATH} exceeds the limit of 3"], // Custom validation for limiting the array length
  },
  videoUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  matchtitle: {
    type: String,
    required: true,
  },
  weatherreport: {
    type: String,
    required: true,
  },
  pitchreport: {
    type: String,
    required: true,
  },
  teamnews: {
    type: String,
    required: true,
  },
  squad: {
    type: String,
    required: true,
  },
  predictionresult: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  live: {
    type: String,
    required: true,
  },
  playerNames: {
    type: [String], // Array of player names
    validate: [arrayLimitPlayers, "{PATH} exceeds the limit of 11"],
  },
});

function arrayLimitPlayers(val){
  return val.length >= 11;
}

// Custom validation function to limit the array length
function arrayLimit(val) {
  return val.length <= 3;
}

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
