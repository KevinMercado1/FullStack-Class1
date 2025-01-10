import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setNotification,
  clearNotification,
} from '../reducers/ notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();

  const showNotification = () => {
    dispatch(setNotification('This is a notification!'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000); // Borra la notificación después de 5 segundos
  };

  return <button onClick={showNotification}>Show Notification</button>;
};

export default Notification;
