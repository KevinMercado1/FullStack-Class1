import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
test('renders title and author, but not URL or likes by default', async () => {
const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    id: '5a422aa71b54a676234d17f8',
    user: {
    username: 'testuser',
    name: 'Test User',
    id: '5a422aa71b54a676234d17f9'
    }
};

await act(async () => {
    render(<Blog blog={blog} updateBlog={jest.fn()} deleteBlog={jest.fn()} />);
});

// Check that title and author are rendered
expect(screen.getByText('Test Blog Test Author')).toBeInTheDocument();

// Check that URL and likes are not displayed by default
expect(screen.queryByText('http://example.com')).not.toBeInTheDocument();
expect(screen.queryByText('5 likes')).not.toBeInTheDocument();
});

test('calls the like button handler twice when clicked twice', async () => {
const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    id: '5a422aa71b54a676234d17f8',
    user: {
    username: 'testuser',
    name: 'Test User',
    id: '5a422aa71b54a676234d17f9'
    }
};

const mockHandler = jest.fn();
const user = userEvent.setup();

await act(async () => {
    render(
    <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={jest.fn()}
    />
    );
});

// Click the "View" button to display blog details
const viewButton = screen.getByText('View');
await act(async () => {
    await user.click(viewButton);
});

// Click the "Like" button twice
const likeButton = screen.getByText('Like');
await act(async () => {
    await user.click(likeButton);
});
await act(async () => {
    await user.click(likeButton);
});

// Assert that the handler was called twice
expect(mockHandler).toHaveBeenCalledTimes(2);
});
