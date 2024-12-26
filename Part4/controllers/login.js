const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const loginRouter = require('express').Router();

// Login endpoint
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '1h', // Optional: token expiration
    });

    res.status(200).send({
      token,
      username: user.username,
      name: user.name, // Include name if it's part of the user schema
    });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = loginRouter;
