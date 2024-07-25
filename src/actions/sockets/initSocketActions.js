import io from 'socket.io-client';
import Config from 'react-native-config';
import { SET_SOCKET } from '../../utils/constants';

export const setSocket = () => dispatch => {
    const socket = io(Config.SOCKET);
    dispatch({
        type: SET_SOCKET,
        payload: socket
    });
};