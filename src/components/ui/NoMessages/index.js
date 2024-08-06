import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import ButtonWithIcon from '../ButtonWithIcon';
import { useNavigation } from '@react-navigation/native';

const NoMessages = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        <Image source={{uri: 'https://storage.googleapis.com/inexplora/inexplora-recursos/no-messages.png'}} style={styles.image} />
        <Text style={styles.title}>¡Ups! no tienes chats.</Text>
        <Text style={styles.subtitle}>¡Aún no hay mensajes en tu bandeja de entrada! Explora grupos interesantes y únete a viajes emocionantes.</Text>
        <View style={styles.separator} />
        <ButtonWithIcon handleClick={() => navigation.navigate('MainTabs', {
            screen: 'Grupos'
        })} title='Explorar grupos'/>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 224,
    height: 194,
    marginBottom: height / 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    width: width * 0.8,
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  createNew: {
    fontSize: 16,
    color: '#0000FF',
  },
});

export default NoMessages;
