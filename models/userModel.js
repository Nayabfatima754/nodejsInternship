const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true, 
        type: String,
        unique: true, 
        index:"true"
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
