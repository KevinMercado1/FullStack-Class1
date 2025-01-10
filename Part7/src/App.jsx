import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnecdoteList from '../components/AnecdoteList';
import CreateNew from '../components/CreateAnecdote';
import Anecdote from '../components/Anecdote';
import About from '../components/About';
import Footer from '../components/Footer';
import { useField, useResource, useCountry } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import UsersView from '../components/UsersView';

<Route path="/users" element={<UsersView />} />;
<Route path="/users/:id" element={<UsersView />} />;
// Menu Component
const Menu = () => {
  const padding = { paddingRight: 5 };
  return (
    <div>
      <Link to="/" style={padding}>
        Anecdotes
      </Link>
      <Link to="/create" style={padding}>
        Create New
      </Link>
      <Link to="/about" style={padding}>
        About
      </Link>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');
  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');
  const [countryName, setCountryName] = useState('');
  const country = useCountry(countryName);

  const dispatch = useDispatch();
  const reduxNotification = useSelector((state) => state.notification);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    dispatch(setNotification(`Anecdote "${anecdote.content}" created!`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const handleCountrySearch = (e) => {
    e.preventDefault();
    setCountryName(e.target.elements.countryName.value);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset();
    number.reset();
  };

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <div style={{ color: 'green' }}>{notification}</div>}
        {reduxNotification && (
          <div style={{ color: 'green' }}>{reduxNotification}</div>
        )}
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
        </Routes>
        <Footer />
        <div>
          <h2>Country Search</h2>
          <form onSubmit={handleCountrySearch}>
            <input name="countryName" />
            <button>Search</button>
          </form>
          {country ? (
            <div>
              <h3>{country.name.common}</h3>
              <p>Capital: {country.capital[0]}</p>
              <p>Population: {country.population}</p>
            </div>
          ) : (
            <p>No country found</p>
          )}
        </div>
        <div>
          <h2>Notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <input {...content.inputProps} />
            <button>Create</button>
          </form>
          {notes.map((n) => (
            <p key={n.id}>{n.content}</p>
          ))}
        </div>
        <div>
          <h2>Persons</h2>
          <form onSubmit={handlePersonSubmit}>
            <input {...name.inputProps} />
            <input {...number.inputProps} />
            <button>Create</button>
          </form>
          {persons.map((p) => (
            <p key={p.id}>
              {p.name} {p.number}
            </p>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
