import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Step5 = ({ navigation }) => {
  const [minGroupSize, setMinGroupSize] = useState(18);
  const [maxGroupSize, setMaxGroupSize] = useState(80);

  const updateMinGroupSize = (itemValue) => {
    setMinGroupSize(itemValue);
    // Si el mínimo es mayor que el máximo actual, ajusta el máximo para coincidir con el nuevo mínimo
    if (itemValue > maxGroupSize) {
      setMaxGroupSize(itemValue);
    }
  };

  const continueButton = () => {
    navigation.navigate('step6');
  };

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.label}>¿Prefieren un rango de edad específico para los integrantes del grupo?</Text>
            <Text style={styles.helperText}>Edad mínima:</Text>
            <Picker
                selectedValue={minGroupSize}
                onValueChange={(itemValue) => updateMinGroupSize(itemValue)}
                style={styles.picker}
            >
                {Array.from({ length: (80 - 18 + 1) }, (_, i) => i + 18).map(value => ( // Ajusta para empezar desde 18
                <Picker.Item key={value} label={`${value}`} value={value} />
                ))}
            </Picker>
            <Text style={styles.helperText}>Edad máxima:</Text>
            <Picker
                selectedValue={maxGroupSize}
                onValueChange={(itemValue) => setMaxGroupSize(itemValue)}
                style={styles.picker}
            >
                {Array.from({ length: 80 - minGroupSize + 1 }, (_, i) => i + minGroupSize).map(value => (
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
    marginBottom: 5,
  },
  helperText: {
    fontSize: 14,
    marginBottom: 5,
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

export default Step5;
