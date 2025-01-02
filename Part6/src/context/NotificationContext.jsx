import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Create the context
const NotificationContext = createContext();

// Reducer to manage notifications
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

// Custom hook to access the NotificationContext
export const useNotification = () => useContext(NotificationContext);

// NotificationProvider using useReducer
export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
