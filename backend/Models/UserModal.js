// User.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        default: '' 
    },
    facebook: {
        type: String, 
        default: '' 
    },
    about: {
        type: String, 
        default: '' 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    img_url: {
        type: String,
        default: '' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Export the user model
module.exports = User;
