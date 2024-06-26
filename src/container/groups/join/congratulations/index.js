import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const CongratulationsRequestToJoin = ({ navigation }) => {
  const confettiRef = useRef(null);

  useEffect(() => {
    // Dispara el confeti automáticamente al montar el componente
    confettiRef.current.start();
  }, []);

  const handlePress = () => {
    navigation.navigate('Inicio'); // Asegúrate de que 'Login' sea el nombre correcto de la ruta
  };

  return (
    <ImageBackground 
      source={require('./../../../../assets/pattern2.png')} // Cambia a tu nueva imagen de fondo
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.checkmarkCircle}>
          <Image source={require('./../../../../assets/check.png')} style={{width:80, height: 80}} />
        </View>
        <Text style={styles.congratsText}>Exito!</Text>
        <Text style={styles.detailText}>Felicidades! se a solicitado la union al grupo.</Text>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.buttonText}>Ir al Inicio</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmarkText: {
    fontSize: 40,
    color: '#6ECB63', // Ajusta el color según tu checkmark
  },
  congratsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white', // Cambia al color que desees
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 20,
    color: '#007BFF', // Cambia al color que desees
  },
});

export default CongratulationsRequestToJoin;
