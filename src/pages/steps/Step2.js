import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox, NativeBaseProvider, Select } from 'native-base';
import ButtonCustom from '../../components/ui/Button';
import { saveGroupTravelMode } from '../../actions/groups/groupAction';
import { useDispatch } from 'react-redux';

const P2_TravelMode = ({ navigation }) => {
  const dispatch = useDispatch();
  const [transporte, setTransporte] = useState('');
  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);
  const [compartirConduccion, setCompartirConduccion] = useState(false);

  const handleTransporteChange = (itemValue) => {
    setTransporte(itemValue);
    setMostrarCheckbox(itemValue === 'autoParticular');
  };
  const continueButton = () => {
    dispatch(saveGroupTravelMode(transporte))
    navigation.navigate('step3');
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Select
          selectedValue={transporte}
          minWidth={200}
          accessibilityLabel="Seleccione un transporte"
          placeholder="Seleccione un transporte"
          _selectedItem={{
            bg: 'rgba(57, 103, 176, 0.4)',
          }}
          mt={1}
          onValueChange={itemValue => handleTransporteChange(itemValue)}
        >
          <Select.Item label="Avión" value="avion" />
          <Select.Item label="Auto particular" value="autoParticular" />
          <Select.Item label="Bus" value="bus" />
          <Select.Item label="Mochileo" value="mochileo" />
          <Select.Item label="Moto" value="moto" />
          <Select.Item label="Arriendo de vehículo" value="arriendoVehiculo" />
        </Select>
        <Text style={styles.infoText}>¿Cómo prefieren viajar?</Text>
        <Text style={styles.helperText}>
          Seleccionen el medio de transporte para su viaje.
        </Text>
        {mostrarCheckbox && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              isChecked={compartirConduccion}
              onChange={setCompartirConduccion}
              value="compartir"
              accessibilityLabel="Compartir conducción"
            />
            <Text style={styles.checkboxLabel}>¿Es importante para ustedes que todas las personas cuenten con licencia de conducción válida para compartir el volante?</Text>
          </View>
        )}
        <View style={{ flex: 1 }} />
        <ButtonCustom
          title="Continuar"
          onPress={() => continueButton()}
        />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo amarillo de la imagen
    padding: 20, // Agrega un poco de padding alrededor
  },
  infoText: {
    position: 'absolute',
    top: 15,
    left: 25, // Ajusta según necesidades
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#000',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // para asegurar que el texto no se corte
    backgroundColor: '#fff', // Color de fondo
    marginBottom: 20, // Espaciado debajo del Picker
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // para asegurar que el texto no se corte
    backgroundColor: '#fff', // Color de fondo
    marginBottom: 20, // Espaciado debajo del Picker
  },
  iconContainer: {
    top: 5,
    right: 15,
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#413A3A',
    flexShrink: 1, // Asegura que el texto se ajuste si es demasiado largo
    marginLeft: 10,
  },
});

export default P2_TravelMode;
