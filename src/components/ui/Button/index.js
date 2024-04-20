import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/Button';

const ButtonCustom = ({ 
  onPress, 
  title,
  disabled,
}) => {
    return (
      <TouchableOpacity disabled={disabled} style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
};
export default ButtonCustom;
