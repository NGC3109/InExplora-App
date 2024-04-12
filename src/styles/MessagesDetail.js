import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    senderName: {
      color: 'black', // O el color que corresponda
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },
    avatarPlaceholder: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    avatarSent: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 10, // Espacio entre el avatar y el mensaje para los enviados
      alignSelf: 'flex-end', // Alinear a la derecha para los avatares de los mensajes enviados
    },
    avatarReceived: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 10, // Espacio entre el avatar y el mensaje para los recibidos
      alignSelf: 'flex-start', // Alinear a la izquierda para los avatares de los mensajes recibidos
    },
    messagesContainer: {
      padding: 10,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      marginBottom: 3,
      flexDirection: 'row-reverse', // Cambia la dirección para los enviados
      alignItems: 'center', // Alinea los avatares y mensajes en el centro verticalmente
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      marginBottom: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageBubbleSend: {
      padding: 8,
      borderRadius: 20,
      borderBottomRightRadius: 0,
      backgroundColor: '#DCF8C5',
      maxWidth: '80%',
      alignItems: 'flex-end',
    },
    messageBubbleReceive: {
      padding: 8,
      borderRadius: 20,
      borderTopLeftRadius: 0,
      backgroundColor: '#E5E5EA',
      maxWidth: '80%',
      alignItems: 'flex-start',
    },
    messageText: {
      fontSize: 16,
      color: '#000',
    },
    timestampContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 4, // Agrega un pequeño margen superior si es necesario
    },
    timestamp: {
      fontSize: 12,
      color: '#999',
      marginLeft: 4,
    },
    status: {
      fontSize: 12,
      color: '#999',
      alignSelf: 'flex-end',
      marginTop: 4,
    },  
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: '#F0F0F0',
      borderTopColor: '#E0E0E0',
      borderTopWidth: 1,
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#FFF',
      borderRadius: 20,
      paddingHorizontal: 15,
    },
    iconButton: {
      padding: 8,
    },
  });