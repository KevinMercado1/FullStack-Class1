const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/User');

testingRouter.post('/reset', async (request, response) => {
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
});

module.exports = testingRouter;
