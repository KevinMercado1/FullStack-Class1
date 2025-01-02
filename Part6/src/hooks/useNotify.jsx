import { useNotification } from '../context/NotificationContext';

const useNotify = () => {
  const { dispatch } = useNotification();

  return (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message });
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), 5000);
  };
};

export default useNotify;
