import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      padding: 16,
      alignItems: 'center',
    },
    welcomeBack: {
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: 50,
    },
    signInText: {
      fontSize: 16,
      color: '#666',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 12,
      width: '100%',
      marginBottom: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      alignItems: 'center',
    },
    checkbox: {
      marginRight: 8,
    },
    label: {
      marginRight: 10,
    },
    forgotPassword: {
      color: '#007bff',
    },
    signInButton: {
      backgroundColor: '#007bff',
      borderRadius: 10,
      padding: 12,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    signInButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    orText: {
      alignSelf: 'center',
      marginVertical: 12,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 12,
      width: '100%',
      marginBottom: 10,
    },
    buttonText: {
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });