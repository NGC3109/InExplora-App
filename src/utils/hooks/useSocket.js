import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJoinRequestCount, socketConnectionError } from "../../actions/sockets/socketAction";
import { io } from "socket.io-client";

export const useSocket = (userId) => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        const socket = io('http://192.168.28.1:3001');
  
        socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit('joinRoom', { userId });
            socket.emit('getJoinRequestCount', { userId });  // Asegúrate de emitir después de que se conecta el socket
        });
  
        socket.on('pendingJoinRequestCount', (data) => {
            console.log('Recuento de solicitudes de unión pendientes:', data);
            if (data && data.count !== undefined) {
                dispatch(setJoinRequestCount(data.count));
            } else {
                console.log('Datos incorrectos recibidos:', data);
            }
        });
  
        socket.on('connect_error', (err) => {
            console.error('Error de conexión:', err.message);
            dispatch(socketConnectionError(err.message));
        });
        
        return () => {
            socket.off('pendingJoinRequestCount');
            socket.off('connect_error');
            socket.disconnect();
        };
    }, [userId, dispatch]);
};

