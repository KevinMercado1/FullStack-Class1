import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Ensure you have this file correctly configured

const rootElement = document.getElementById('root');

// Create the React root
const root = createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
