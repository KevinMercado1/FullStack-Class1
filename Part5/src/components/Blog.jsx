import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Handle incrementing likes
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlog);
  };

  // Handle deleting the blog
  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div
      className="blog"
      style={{ border: '1px solid', marginBottom: 5, padding: 5 }}
    >
      {/* Display title and author */}
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>

      {/* Conditionally render blog details */}
      {showDetails && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>Like</button>
          </p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

// Add PropTypes for validation
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
