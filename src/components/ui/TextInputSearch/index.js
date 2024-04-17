import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../../../styles/InputSearch';
import { DolarIcon } from '../../../assets/vectores';

const MoneyInput = ({ placeholder, placeholderTextColor, infoText, onChangeText, textValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <DolarIcon />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={textValue}
          onChangeText={text => {
            const nonNumericRemoved = text.replace(/[^0-9]/g, '');
            const formattedText = nonNumericRemoved.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            onChangeText(formattedText);
          }}
          keyboardType='numeric'
        />
      </View>
      <Text style={styles.infoText}>{infoText}</Text>
    </View>
  );
};

MoneyInput.defaultProps = {
  placeholder: 'Ingresa un presupuesto',
  placeholderTextColor: '#C3C3C3',
  infoText: '¿Cuánto es el mínimo que recomiendas para viajar?'
};

export default MoneyInput;
