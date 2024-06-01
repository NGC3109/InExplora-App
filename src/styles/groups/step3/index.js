import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  map: {
      marginTop: 20,
      width: '100%',
      height: 200,
  },
  subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
      width: '70%',
  },
  description: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 50,
      color: '#413A3A',
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