import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  );

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
  };

  return (
    <Router>
      <nav>
        <Link to="/authors">Authors</Link>
        <Link to="/books">Books</Link>
        {token ? (
          <>
            <Link to="/add-book">Add Book</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/books" /> : <Navigate to="/login" />}
        />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add-book"
          element={token ? <NewBook /> : <p>Please log in to add a book.</p>}
        />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} token={token} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
