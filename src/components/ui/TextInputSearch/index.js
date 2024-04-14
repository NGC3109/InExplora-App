import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../../styles/InputSearch';

const SearchInput = ({ icon, placeholder, placeholderTextColor, infoText, onChangeText, textValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name={icon} size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={textValue}
          onChangeText={onChangeText}  // Función para manejar el cambio de texto
        />
      </View>
      <Text style={styles.infoText}>{infoText}</Text>
    </View>
  );
};

SearchInput.defaultProps = {
  icon: 'search',
  placeholder: 'Torres del paine',
  placeholderTextColor: '#C3C3C3',
  infoText: '¿Dónde te gustaría ir de aventura?'
};

export default SearchInput;
