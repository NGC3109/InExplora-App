import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 20,
    },
    closeButton: {
      // Style for the close button
    },
    closeButtonText: {
      color: '#FFFFFF', // Text color for the close button
      fontSize: 16, // Adjust the size as needed
      fontWeight: 'bold', // Bold text for the 'X'
    },
    textarea: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontSize: 16,
      height: 100, // Altura fija para asegurar espacio suficiente para escribir
      textAlignVertical: 'top', // Alinea el texto al inicio en Android
    },
    caracteresLimit: {
      textAlign: 'right',
      marginBottom: 20,
    },
    helperText: {
      fontSize: 12,
      color: 'grey',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black'
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