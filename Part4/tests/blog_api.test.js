process.env.NODE_ENV = 'test';
process.env.SECRET = 'test-secret-key';

const { test, expect } = require('@playwright/test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI;

test.describe('Blog API', () => {
  let token;

  test.beforeAll(async () => {
    try {
      console.log('Starting test setup...');

      // Conectar a la base de datos si es necesario
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI);
      }

      // Limpiar colección de usuarios y crear un nuevo usuario
      await User.deleteMany({});
      console.log('Cleared existing users');

      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpass', // Contraseña en texto plano
      };

      console.log('Creating test user:', newUser.username);
      const savedUser = await new User(newUser).save();
      console.log('User created with id:', savedUser._id);

      // Autenticarse para obtener el token
      const loginResponse = await supertest(app).post('/api/login').send({
        username: newUser.username,
        password: newUser.password,
      });

      console.log('Login response status:', loginResponse.status);

      if (!loginResponse.body.token) {
        throw new Error('Failed to obtain authentication token');
      }

      token = loginResponse.body.token;
      console.log('Successfully obtained token:', token);
    } catch (error) {
      console.error('Error during test setup:', error);
      throw error;
    }
  });

  test.afterAll(async () => {
    console.log('Cleaning up after tests...');
    await mongoose.connection.close();
  });

  test.beforeEach(async () => {
    await Blog.deleteMany({});
    const initialBlog = new Blog({
      title: 'Initial Blog',
      author: 'Initial Author',
      url: 'http://initialblog.com',
      likes: 0,
    });
    await initialBlog.save();
  });

  test('GET /api/blogs returns correct amount of blog posts', async () => {
    const response = await supertest(app).get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('POST /api/blogs creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'http://newblog.com',
      likes: 5,
    };

    const response = await supertest(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(201);

    const allBlogs = await supertest(app).get('/api/blogs');
    expect(allBlogs.body).toHaveLength(2);
  });
});
