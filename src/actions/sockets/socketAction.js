import io from 'socket.io-client';
import { SET_JOIN_REQUEST_COUNT, SOCKET_CONNECTION_ERROR, SET_UNREAD_MESSAGE_COUNT, SET_GENERAL_REQUEST_COUNT } from '../../utils/constants';
import Config from 'react-native-config';

export const setUnreadMessageCount = (count) => ({
  type: SET_UNREAD_MESSAGE_COUNT,
  payload: count
});

export const setJoinRequestCount = (count) => ({
  type: SET_JOIN_REQUEST_COUNT,
  payload: count,
});
export const setGeneralRequestCount = (count) => ({
  type: SET_GENERAL_REQUEST_COUNT,
  payload: count,
});

// Acción para manejar errores de conexión del socket
export const socketConnectionError = (error) => ({
  type: SOCKET_CONNECTION_ERROR,
  payload: error,
});
