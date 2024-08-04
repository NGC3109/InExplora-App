import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LogoInBlue } from '../../../../assets/vectores';
import ButtonWithIcon from '../../../../components/ui/ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CongratulationsRequestToJoin = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={{uri: 'https://storage.googleapis.com/inexplora/inexplora-recursos/congratulations-request-join.jpg'}} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>INEXPL<LogoInBlue />RA</Text>
          <Text style={styles.subtitle}>La aventura comienza con buenos amigos</Text>
        </View>
        <View style={styles.containerButton}>
          <ButtonWithIcon 
            handleClick={() => 
              navigation.navigate('MainTabs', {
                screen: 'Inicio'
              })}
            title="Finalizar" 
            width="100%" 
            height={50} 
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 60,
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 13,
    color: '#001422',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  containerButton: {
    marginBottom: 20
  },
});

export default CongratulationsRequestToJoin;
