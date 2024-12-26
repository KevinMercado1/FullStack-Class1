import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    backgroundColor: 'lightgray',
    color: 'black',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: '10px',
    marginBottom: '30px',
    fontweight: 'bold',
  };
  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
