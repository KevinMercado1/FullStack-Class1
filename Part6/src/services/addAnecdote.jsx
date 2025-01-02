const addAnecdote = async (content) => {
  const res = await fetch('/api/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create anecdote:');
  }
  return res.json();
};

export default addAnecdote;
