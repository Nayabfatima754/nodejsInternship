const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true, // You can keep this if using an older Mongoose version
            useUnifiedTopology: true // You can keep this if using an older Mongoose version
        });
        console.log('Connected to MongoDB server');

        // Set up event listeners
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB server connection error", err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("Disconnected from MongoDB server");
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};


// Export the connection
module.exports = connectToDatabase;
