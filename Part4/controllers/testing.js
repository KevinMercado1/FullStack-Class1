const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  if (process.env.NODE_ENV === 'test') {
    try {
      await Blog.deleteMany({});
      await User.deleteMany({});
      response.status(204).end();
    } catch (error) {
      console.error('Error in test DB reset:', error);
      response
        .status(500)
        .json({ error: 'Internal server error during DB reset' });
    }
  } else {
    response
      .status(401)
      .json({ error: 'Testing endpoints are only available in test mode' });
  }
});

module.exports = router;
