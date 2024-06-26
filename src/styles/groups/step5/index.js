import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', // Fondo amarillo de la imagen
      padding: 20, // Agrega un poco de padding alrededor
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
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
      marginBottom: 30,
      color: '#413A3A'
    },
    helperText: {
      fontSize: 14,
      marginBottom: 5,
    },
    picker: {
      marginBottom: 20,
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