import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // Fondo blanco
    },
    avatarContainer: {
      position: 'relative',
    },
    onlineIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: 'white',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    online: {
      backgroundColor: '#ffc107', // Color amarillo/mostaza para indicar que está en línea
    },
    offline: {
      backgroundColor: 'gray', // Color gris para indicar que está desconectado
    },
    dateAndBadgeContainer: {
      alignItems: 'flex-end',
    },
    messageDetails: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 10,
    },
    messageDate: {
      fontSize: 12,
      color: '#a1a1a1',
      marginBottom: 4, // Espacio entre la fecha y el badge si existe
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1, // Borde inferior en lugar de superior
      borderBottomColor: '#e1e1e1', // Color del borde más claro
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    messageContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 10,
    },
    userName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    lastMessage: {
      color: '#a1a1a1', // Color de texto más claro para el último mensaje
    },
    messageCountContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#3872e9', // Fondo azul para el contador de mensajes
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageCountText: {
      color: 'white', // Texto blanco para el contador de mensajes
      fontWeight: 'bold',
    },
  });