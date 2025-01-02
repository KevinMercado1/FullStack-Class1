import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to fetch anecdotes
const getAnecdotes = async () => {
  const response = await axios.get('http://localhost:<PORT>/anecdotes');
  return response.data;
};

// Function to update an anecdote
const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(
    `http://localhost:<PORT>/anecdotes/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

const AnecdoteList = () => {
  const queryClient = useQueryClient();

  const {
    data: anecdotes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  const { mutate } = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Anecdote service not available due to server issues.</div>;

  const handleVote = (anecdote) => {
    mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>
            has <strong>{anecdote.votes}</strong> votes
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
