import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', // Fondo amarillo de la imagen
      padding: 20, // Agrega un poco de padding alrededor
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
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });