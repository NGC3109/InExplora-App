import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJoinRequestCount, socketConnectionError, setUnreadMessageCount, setGeneralRequestCount } from "../../actions/sockets/socketAction";

export const useSocketHome = (userId) => {
    const dispatch = useDispatch();
    const socket = useSelector(state => state.initSocketReducer.socket);
    useEffect(() => {
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
            if (data && data.count !== undefined) {
                dispatch(setJoinRequestCount(data.count));
            } else {
                console.log('Datos incorrectos recibidos:', data);
            }
        });

        socket.on('pendingRequestCount', (data) => {
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
        };
    }, [userId, dispatch]);
};

