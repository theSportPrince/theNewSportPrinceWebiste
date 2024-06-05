

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
    
  },
  pitchreport: {
    type: String,
    
  },
  teamnews: {
    type: String,
    
  },
  squad: {
    type: String,
  
  },
  predictionresult: {
    type: String,
    
  },
  venue: {
    type: String,
   
  },
  date: {
    type: String,
   
  },
  live: {
    type: String,

  },
  TeamA: {
    type: String,
 
  },
  TeamB: {
    type: String,
  
  },
  teamaname: {
    type: String,
   
  },
  teambname: {
    type: String,
  
  },
  category: { 
    type: String, 
    required: true,
  },
  blogcategory: { 
    type: String, 
    required: true,
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
