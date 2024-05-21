import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJoinRequestCount, socketConnectionError, setUnreadMessageCount, setGeneralRequestCount } from "../../actions/sockets/socketAction";
import { io } from "socket.io-client";
import Config from "react-native-config";

export const useSocket = (userId) => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        const socket = io(Config.SOCKET);
  
        socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit('joinRoom', { userId });
            socket.emit('getJoinRequestCount', { userId });
            socket.emit('getGeneralRequestCount', { userId });
            socket.emit('countUnreadMessages', { userId });
        });

        socket.on('unreadMessageCount', ({ unreadCount }) => {
            dispatch(setUnreadMessageCount(unreadCount));
        });

        socket.on('pendingJoinRequestCount', (data) => {
            console.log('getJoinRequestCount: ', data)
            if (data && data.count !== undefined) {
                dispatch(setJoinRequestCount(data.count));
            } else {
                console.log('Datos incorrectos recibidos:', data);
            }
        });

        socket.on('pendingRequestCount', (data) => {
            console.log('pendingRequestCount: ', data)
            if (data && data.count !== undefined) {
                dispatch(setGeneralRequestCount(data.count));
            } else {
                console.log('Datos incorrectos:', data);
            }
        });
        
        socket.on('connect_error', (err) => {
            console.error('Error de conexión:', err.message);
            dispatch(socketConnectionError(err.message));
        });

        return () => {
            socket.off('pendingJoinRequestCount');
            socket.off('unreadMessageCount');
            socket.off('connect_error');
            socket.disconnect();
        };
    }, [userId, dispatch]);
};

