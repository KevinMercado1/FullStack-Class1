const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to extract token from Authorization header
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.substring(7); // Extract token after 'Bearer '
  } else {
    req.token = null;
  }
  next();
};

// Middleware to extract and validate user from token
const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'jwt must be provided' });
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'jwt must be provided' });
    }

    // Assign user to req.user
    req.user = await User.findById(decodedToken.id);
    if (!req.user) {
      return res.status(401).json({ error: 'user not found' });
    }

    next();
  } catch (error) {
    // Handle token expiration or invalid token
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ error: 'Token expired. Please log in again.' });
    }

    console.error(error); // Log error (consider using a logging library like Winston in production)
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { tokenExtractor, userExtractor };
