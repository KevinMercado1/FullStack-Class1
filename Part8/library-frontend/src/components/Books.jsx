import React from 'react';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { GET_BOOKS, GET_ME, BOOKS_BY_GENRE } from '../queries';
import { gql } from '@apollo/client';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Books = () => {
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const newBook = data.bookAdded;

      client.cache.updateQuery({ query: GET_BOOKS }, (existingData) => {
        return {
          ...existingData,
          allBooks: [...existingData.allBooks, newBook],
        };
      });

      alert(`New book added: ${newBook.title}`);
    },
  });

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(GET_BOOKS);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_ME);

  const { data: genreBooksData, refetch: refetchBooksByGenre } = useQuery(
    BOOKS_BY_GENRE,
    {
      variables: { genre: null },
      skip: true,
    }
  );

  if (booksLoading || userLoading) return <p>Loading...</p>;
  if (booksError || userError)
    return <p>Error: {booksError?.message || userError?.message}</p>;

  const allBooks = booksData?.allBooks || [];
  const favoriteGenre = userData?.me?.favoriteGenre;

  const genres = [...new Set(allBooks.flatMap((book) => book.genres))];

  const displayedBooks = genreBooksData?.allBooks || allBooks;

  const handleGenreChange = (genre) => {
    refetchBooksByGenre({ genre });
  };

  return (
    <div>
      <h2>Books</h2>

      <div>
        <button onClick={() => handleGenreChange(null)}>All genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
      </div>

      {/* Tabla de libros */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {favoriteGenre && (
        <div>
          <h3>Books in your favorite genre: {favoriteGenre}</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {allBooks
                .filter((book) => book.genres.includes(favoriteGenre))
                .map((book) => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Books;
