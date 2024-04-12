import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Step4 = ({ navigation }) => {
  const [groupSize, setGroupSize] = useState(1);

  const continueButton = () => {
    navigation.navigate('step5');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>¿Cuál es el número ideal de personas en su grupo de viaje?</Text>
        <Picker
            selectedValue={groupSize}
            onValueChange={(itemValue) => setGroupSize(itemValue)}
            style={styles.picker}
        >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
            <Picker.Item key={value} label={`${value}`} value={value} />
            ))}
        </Picker>
      </View>
      <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={() => continueButton()}>
            <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo amarillo de la imagen
    padding: 20, // Agrega un poco de padding alrededor
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20, // Ajustado para dar espacio entre la etiqueta y el picker
  },
  picker: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Step4;
