import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">
            Title:
            <input
            id="title"
            aria-label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </label>
      </div>
      <div>
        <label htmlFor="author">
            Author:
            <input
            id="author"
            aria-label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
        </label>
      </div>
      <div>
        <label htmlFor="url">
            URL:
            <input
            id="url"
            aria-label="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
