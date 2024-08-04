import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBack: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 10,
    color: '#88ABBD',
    textAlign: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#007481',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '80%',
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#007481'
  },
});