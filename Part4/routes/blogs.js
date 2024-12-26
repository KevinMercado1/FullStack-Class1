const express = require('express');
const Blog = require('../models/blog');
const middleware = require('../middleware/auth');
const blogsRouter = express.Router();

// Obtener todos los blogs
blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// Crear un nuevo blog
blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const { title, author, url, likes } = req.body;
    const user = req.user;

    // Validación de campos
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    try {
      const savedBlog = await blog.save();

      // Asegurarse de que el usuario tiene un array de blogs
      if (!user.blogs) {
        user.blogs = [];
      }
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      res.status(201).json({
        message: 'Blog created successfully',
        blog: savedBlog,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while saving the blog' });
    }
  }
);

// Eliminar un blog
blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: 'Unauthorized to delete this blog' });
    }

    try {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting the blog' });
    }
  }
);

module.exports = blogsRouter;
