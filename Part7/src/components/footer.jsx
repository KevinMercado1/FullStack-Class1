import React from 'react';

const Footer = () => (
  <footer style={footerStyle}>
    <p>
      Anecdote app for{' '}
      <a
        href="https://fullstackopen.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Full Stack Open
      </a>
      . See the{' '}
      <a
        href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js"
        target="_blank"
        rel="noopener noreferrer"
      >
        source code
      </a>{' '}
      on GitHub.
    </p>
  </footer>
);

const footerStyle = {
  marginTop: '20px',
  padding: '10px 0',
  borderTop: '1px solid #ccc',
  textAlign: 'center',
  color: '#555',
};

export default Footer;
