import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) return <p>Anecdote no found.</p>;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author:{anecdote.author}</p>
    </div>
  );
};

export default Anecdote;
