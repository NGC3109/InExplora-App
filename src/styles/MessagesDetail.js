import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  audioMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  audioMessageContainerCustom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  audioSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  audioDuration: {
    width: 50,  // Ajusta el tamaño según tus necesidades
    textAlign: 'right',
  },
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
    avatarFake: {
      marginLeft: 2,
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
      flex: 1,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      marginHorizontal: 3,
      marginBottom: 3,
      flexDirection: 'row-reverse', // Cambia la dirección para los enviados
      alignItems: 'center', // Alinea los avatares y mensajes en el centro verticalmente
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      marginHorizontal: 3,
      marginBottom: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageBubbleSend: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: '#E5F3FF',
      maxWidth: '80%',
      alignItems: 'flex-end',
    },
    messageBubbleReceive: {
      padding: 8,
      borderRadius: 20,
      borderTopLeftRadius: 0,
      backgroundColor: '#F7F7F9',
      maxWidth: '80%',
      alignItems: 'flex-start',
    },
    messageText: {
      fontSize: 16,
      color: '#111b21',
    },
    timestampContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 4, // Agrega un pequeño margen superior si es necesario
      marginHorizontal: 3
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
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 25,
      margin: 10,
      borderTopColor: 'grey',
    },
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 25,
      paddingHorizontal: 20,
      marginRight: 10,
      fontSize: 16,
      color: '#111b21'
    },
    iconButton: {
      padding: 10,
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: 25,
      padding: 10,
      marginLeft: 10,
    },
    microphoneIcon: {
      color: '#fff',
      fontSize: 24,
    },
    sendIcon: {
      color: '#999',
      fontSize: 24,
    },
    dateContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
      backgroundColor: '#F7F7F9',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      maxWidth: '80%',
    },
    dateContainerFirstMessage: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      backgroundColor: '#F7F7F9',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      maxWidth: '80%',
    },
    dateText: {
      fontSize: 14,
      color: '#9CA1A8',
    },
  });