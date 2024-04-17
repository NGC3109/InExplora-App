import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 20,
    },
    infoText: {
      position: 'absolute',
      top: -5,
      left: 5,
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
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#fff',
      marginBottom: 20,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#fff',
      marginBottom: 20,
    },
    iconContainer: {
      top: 5,
      right: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    helperText: {
      fontSize: 12,
      color: 'grey',
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
    checkboxContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      marginRight: 10,
    },
    checkboxLabel: {
      fontSize: 14,
      color: '#413A3A',
      flexShrink: 1,
      marginLeft: 10,
    },
  });