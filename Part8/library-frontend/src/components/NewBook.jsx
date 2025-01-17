import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, GET_BOOKS, GET_AUTHORS } from '../queries';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
  });

  const handleGenresChange = (e) => {
    const value = e.target.value;
    setGenres(value.split(',').map((genre) => genre.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres,
      },
    });
    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:{' '}
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        Author:{' '}
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        Published:{' '}
        <input
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
      </div>

      <button type="submit">Add Book</button>
    </form>
  );
};

export default NewBook;
