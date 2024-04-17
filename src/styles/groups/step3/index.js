import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', // Fondo amarillo de la imagen
      padding: 20, // Agrega un poco de padding alrededor
    },
    picker: {
      marginBottom: 20, // Espaciado debajo del Picker
    },
    map: {
      marginTop: 20,
        width: '100%',
        height: 200, // Ajusta según tus necesidades
    },
    subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
      width: '70%'
    },
    description: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 50,
      color: '#413A3A'
    },
    infoText: {
      position: 'absolute',
      top: -5,
      left: 10,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      fontSize: 12,
      color: '#000',
    },
    helperText: {
      fontSize: 12,
      color: 'grey', // Color gris para el texto de ayuda
    },
    button: {
      backgroundColor: '#2196F3', // Fondo azul para el botón
      borderRadius: 5, // Bordes ligeramente redondeados
      paddingVertical: 15, // Espaciado vertical para hacer el botón más alto
      alignItems: 'center', // Centra el texto en el botón
      marginTop: 20, // Espaciado arriba del botón
    },
    buttonText: {
      color: 'white', // Texto blanco para el botón
      fontSize: 16,
      fontWeight: 'bold',
    },
  });