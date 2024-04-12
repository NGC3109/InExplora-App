import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Checkbox, NativeBaseProvider  } from 'native-base';

const Step2 = ({ navigation }) => {
  const [transporte, setTransporte] = useState('');
  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);
  const [compartirConduccion, setCompartirConduccion] = useState(false);

  const handleTransporteChange = (itemValue) => {
    setTransporte(itemValue);
    setMostrarCheckbox(itemValue === 'autoParticular');
  };
  const continueButton = () => {
    navigation.navigate('step3');
  }
  return (
    <NativeBaseProvider >
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>¿Cómo prefieren viajar?</Text>
        <Picker
          selectedValue={transporte}
          onValueChange={handleTransporteChange}
          style={styles.picker} // Asegúrate de definir un estilo para el Picker si es necesario
        >
          <Picker.Item label="Avión" value="avion" />
          <Picker.Item label="Auto particular" value="autoParticular" />
          <Picker.Item label="Bus" value="bus" />
          <Picker.Item label="Mochileo" value="mochileo" />
          <Picker.Item label="Moto" value="moto" />
          <Picker.Item label="Arriendo de vehículo" value="arriendoVehiculo" />
        </Picker>
        <Text style={styles.helperText}>
            Seleccionen el medio de transporte para su viaje.
        </Text>
        {mostrarCheckbox && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={compartirConduccion}
              onValueChange={setCompartirConduccion}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>¿Es importante para ustedes que todas las personas conductoras cuenten con licencia de conducción válida para compartir el volante?</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={() => continueButton()}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
    </NativeBaseProvider >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo amarillo de la imagen
    padding: 20, // Agrega un poco de padding alrededor
  },
  picker: {
    marginBottom: 20, // Espaciado debajo del Picker
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  helperText: {
    fontSize: 12,
    color: 'grey', // Color gris para el texto de ayuda
  },
  button: {
    backgroundColor: '#2196F3', // Fondo azul para el botón
    borderRadius: 5, // Bordes ligeramente redondeados
    paddingVertical: 15, // Espaciado vertical para hacer el botón más alto
    alignItems: 'center', // Centra el texto en el botón
    marginTop: 20, // Espaciado arriba del botón
  },
  buttonText: {
    color: 'white', // Texto blanco para el botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'grey',
    flexShrink: 1, // Asegura que el texto se ajuste si es demasiado largo
  },
});

export default Step2;
