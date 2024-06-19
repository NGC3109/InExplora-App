import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LogoInWhite } from '../../../assets/vectores';

const ButtonWithIcon = ({ handleClick, title = "Finalizar", width = '80%' }) => {
    return (
    <TouchableOpacity onPress={handleClick} style={[styles.button, { width }]}>
      <Text style={styles.buttonText}>{title}</Text>
      <View style={styles.buttonIconContainer}>
        <LogoInWhite width={30} height={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#001422',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: 'rgba(0, 20, 34, 0.35)',
    position: 'relative',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  buttonIconContainer: {
    position: 'absolute',
    right: 20,
  },
});

export default ButtonWithIcon;
