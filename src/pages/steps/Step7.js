import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Step7 = ({ navigation }) => {
  const [incluyeMascotas, setIncluyeMascotas] = useState('no');
  const [tamanoMascota, setTamanoMascota] = useState('');

  const handleIncluyeMascotasChange = (itemValue) => {
    setIncluyeMascotas(itemValue);
  };

  const continueButton = () => {
    navigation.navigate('step8');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>¿Incluirán mascotas en su viaje?</Text>
        <Picker
          selectedValue={incluyeMascotas}
          onValueChange={handleIncluyeMascotasChange}
          style={styles.picker}
        >
          <Picker.Item label="No" value="no" />
          <Picker.Item label="Sí" value="si" />
        </Picker>
        <Text style={styles.helperText}>
          Seleccionen si viajarán con mascotas.
        </Text>
        {incluyeMascotas === 'si' && (
          <View>
            <Text style={styles.label}>¿De qué tamaño es su mascota más grande?</Text>
            <Picker
              selectedValue={tamanoMascota}
              onValueChange={(itemValue) => setTamanoMascota(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pequeño" value="Pequeño" />
              <Picker.Item label="Mediano" value="Mediano" />
              <Picker.Item label="Grande" value="Grande" />
              <Picker.Item label="Extra Grande" value="Extra Grande" />
            </Picker>
            <Text style={styles.helperText}>
              Si viaja con más de una mascota, seleccione el tamaño de su mascota más grande.
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={continueButton}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  picker: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  helperText: {
    fontSize: 12,
    color: 'grey',
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

export default Step7;
