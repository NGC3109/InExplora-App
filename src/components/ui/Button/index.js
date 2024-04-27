import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Button';

const ButtonCustom = ({ 
  onPress, 
  title,
  disabled,
  customStyle,
}) => {
    return (
      <TouchableOpacity disabled={disabled} style={[styles.button, customStyle]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
};
export default ButtonCustom;
