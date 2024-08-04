import io from 'socket.io-client';
import Config from 'react-native-config';
import { SET_SOCKET, CLOSE_SOCKET } from '../../utils/constants';

export const setSocket = () => dispatch => {
    const socket = io(Config.SOCKET, {
        transports: ['websocket'],
    });
    socket.on('connect', () => {
        console.log('Connected to socket server');
    });
    socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
    });
    dispatch({
        type: SET_SOCKET,
        payload: socket
    });
};

export const closeSocket = () => (dispatch, getState) => {
    const { socket } = getState().initSocketReducer;
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
        dispatch({
            type: CLOSE_SOCKET,
        });
    }
};
