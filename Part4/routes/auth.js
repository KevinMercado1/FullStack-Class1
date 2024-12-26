const express = require('express');
const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'testuser' && password === 'password123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = authRouter;
