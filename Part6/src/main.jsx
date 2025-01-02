import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Notification />
          <App />
        </NotificationProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
