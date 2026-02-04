// Database connection setup
// I'm using an environment variable here so I can easily switch between
// local development (mongodb://localhost) and production (MongoDB Atlas)
// This is a common pattern I learned for deploying apps - keeps secrets out of code

const mongoose = require('mongoose');

// Use MONGODB_URI from environment, fallback to localhost for local dev
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/simple-mern';

// Connect to MongoDB with some options to avoid deprecation warnings
// These options help with newer versions of MongoDB driver
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Log connection status so I can debug if something goes wrong
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
