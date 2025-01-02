import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useNotify from '../hooks/useNotify';

// Function to post a new anecdote
const postAnecdote = async (newAnecdote) => {
  const response = await axios.post(
    'http://localhost:<PORT>/anecdotes',
    newAnecdote
  );
  return response.data;
};

const AnecdoteForm = () => {
  const notify = useNotify();
  const [content, setContent] = useState('');
  const { dispatch } = useNotification(); // For showing notifications
  const queryClient = useQueryClient(); // For query invalidation

  const { mutate } = useMutation(postAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']); // Refresh anecdotes after adding

      notify(`Anecdote "${content}" added successfully!`);

      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000); // Clear after 5 seconds
    },
    onError: () => {
      notify('Failed to add anecdote. Please try again.'),
        setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check for content length
    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: 'Anecdote must be at least 5 characters long',
          type: 'error',
        },
      });
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000);
      return;
    }

    const newAnecdote = { content, votes: 0 };
    mutate(newAnecdote); // Trigger mutation to add anecdote
    setContent(''); // Clear input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new anecdote"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AnecdoteForm;
