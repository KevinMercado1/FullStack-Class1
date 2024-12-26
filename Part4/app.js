require('dotenv').config();
console.log('Starting server with NODE_ENV:', process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cors = require('cors');
const middleware = require('./middleware/auth');
const testingRouter = require('./controllers/testing');

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

// Route setup
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test') {
  console.log('Test mode detected, mounting testing router at /api/testing');
  app.use('/api/testing', testingRouter);
} else {
  console.log('Not in test mode, testing routes will not be mounted');
}

// Log all registered routes
console.log('Registered routes:');
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`Route: ${r.route.path}`);
  } else if (r.name === 'router') {
    console.log(`Router middleware mounted at: ${r.regexp}`);
  }
});

// MongoDB connection URI
const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost/bloglist';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process if unable to connect
  }
};

// Connect to the database
connectDB();

module.exports = app;
