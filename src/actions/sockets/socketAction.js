import io from 'socket.io-client';
import { SET_JOIN_REQUEST_COUNT, SOCKET_CONNECTION_ERROR } from '../../utils/constants';
import Config from 'react-native-config';
// Acción para actualizar el contador de solicitudes de unión pendientes
export const setJoinRequestCount = (count) => ({
  type: SET_JOIN_REQUEST_COUNT,
  payload: count,
});

// Acción para manejar errores de conexión del socket
export const socketConnectionError = (error) => ({
  type: SOCKET_CONNECTION_ERROR,
  payload: error,
});

// Inicializa la conexión del socket y establece los listeners
export const initializeSocketConnection = (userId) => async (dispatch) => {
  try {
    const socket = io('http://192.168.28.1:3001');

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('joinRoom', { userId });
    });

    socket.on('pendingJoinRequestCount', (data) => {
      console.log('Recuento de solicitudes de unión pendientes:', data);
      dispatch(setJoinRequestCount(data.count));
    });

    socket.on('connect_error', (err) => {
      console.error('Error de conexión:', err.message);
      dispatch(socketConnectionError(err.message));
    });

    // Retorna una función de limpieza para ser llamada cuando el componente se desmonte
    return () => {
      socket.off('pendingJoinRequestCount');
      socket.off('connect_error');
      socket.disconnect();
    };
  } catch (error) {
    console.error('Error al inicializar la conexión del socket:', error);
    dispatch(socketConnectionError(error.message));
  }
};
