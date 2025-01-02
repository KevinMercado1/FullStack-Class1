import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from './reducers/NotificationReducer';
import { useEffect } from 'react';
import anecdoteService from './services/anecdotes'; // Default import

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((initialAnecdotes) => {
      initialAnecdotes.forEach((anecdote) =>
        dispatch(createAnecdote(anecdote))
      );
    });
  }, [dispatch]);

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    if (anecdote) {
      dispatch(voteAnecdote(id)); // Dispatch vote for the anecdote
      dispatch(setNotification(`You voted for "${anecdote.content}"`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    }
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (!content) {
      alert('The anecdote cannot be empty!');
      return;
    }

    const newAnecdote = { content, votes: 0 };

    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`You created "${content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
    event.target.anecdote.value = '';
  };

  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <div style={notificationStyle}>{notification}</div>}
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} {/** Display votes */}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <form onSubmit={addAnecdote}>
        <input name="anecdote" placeholder="Enter new anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
