const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const usersRouter = express.Router();

// Create a new user
usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !password || username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'Username and password must be at least 3 characters long',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

// Get all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;
