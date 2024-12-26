import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('calls the event handler with the correct details when a new blog is created', async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const user = userEvent.setup();
const titleInput = screen.getByRole('textbox', { name: /title/i });
const authorInput = screen.getByRole('textbox', { name: /author/i });
const urlInput = screen.getByRole('textbox', { name: /url/i });
const createButton = screen.getByRole('button', { name: /create/i });

  await user.type(titleInput, 'New Blog Title');
  await user.type(authorInput, 'New Blog Author');
  await user.type(urlInput, 'http://example.com');
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'http://example.com',
  });
  expect(createBlog).toHaveBeenCalledTimes(1);
});
