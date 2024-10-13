const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true, // Fixed the typo here
        type: String,
        unique: true, // Consider making the email unique
    },
    password: {
        required: true,
        type: String,
    },
    userType: {
        type: String,
        required: true,
        enum: ['admin', 'customer'], // Enum for restricting values
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
