import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LogoInBlack } from '../../assets/vectores';
import ButtonWithIcon from '../ui/ButtonWithIcon'; // Ajusta la ruta según la ubicación del archivo
import { useNavigation } from '@react-navigation/native';

const Congratulations = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Fondo de paisajes */}
      <Image
        source={require('../../assets/fondo-congratulations.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={{ position: 'absolute', top: -40 }}>
          <Image
            source={require('../../assets/congratulations-check.png')}
            style={styles.checkImage}
          />
        </View>
        {/* Texto de INEXPLORA */}
        <Text style={styles.headerText}>
          I N E X P L <Text><LogoInBlack width={30} height={30} /></Text> R A
        </Text>
        <Text style={styles.description}>
          Tu grupo se ha creado con éxito, se te enviará una notificación cuando tu grupo sea aprobado.
        </Text>
        <ButtonWithIcon handleClick={() => navigation.navigate('Inicio')} title="Finalizar" width="80%" height={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'stretch',
  },
  overlay: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#ffffff',
    paddingTop: 20,
    flex: 1,
  },
  checkImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default Congratulations;
