export const voteAnecdote = (id) => ({
  type: 'anecdote/vote',
  payload: id,
});

export const createAnecdote = (content) => ({
  type: 'anecdotes/add',
  payload: { content, vote: 0, id: Math.floor(Math.random() * 10000) },
});
