import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveGroupAccommodation } from '../../actions/groups/groupAction';

const P3_Accommodation = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState('');
  const currentGroup = useSelector(state => state.groupReducer.groups);

  const handleHotelsChange = (itemValue) => {
    setHotels(itemValue);
  };
  console.log('currentGroup: ', currentGroup)
  const continueButton = () => {
    dispatch(saveGroupAccommodation(hotels))
    navigation.navigate('step4');
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>¿Qué tipo de alojamiento prefieren?</Text>
        <Picker
          selectedValue={hotels}
          onValueChange={handleHotelsChange}
          style={styles.picker} // Asegúrate de definir un estilo para el Picker si es necesario
        >
            <Picker.Item label="Hotel" value="hotel" />
            <Picker.Item label="Hostal" value="hostal" />
            <Picker.Item label="Apartamento turístico" value="apartamentoTuristico" />
            <Picker.Item label="Bed and Breakfast (B&B)" value="bedAndBreakfast" />
            <Picker.Item label="Casa rural" value="casaRural" />
            <Picker.Item label="Casa de huéspedes" value="casaDeHuespedes" />
            <Picker.Item label="Resort" value="resort" />
            <Picker.Item label="Albergue juvenil" value="albergueJuvenil" />
            <Picker.Item label="Camping" value="camping" />
            <Picker.Item label="Alojamiento de uso compartido" value="alojamientoCompartido" />
            <Picker.Item label="Motel" value="motel" />
            <Picker.Item label="Posada" value="posada" />
            <Picker.Item label="Cabaña o chalet" value="cabanaChalet" />
            <Picker.Item label="Apartahotel" value="apartahotel" />
            <Picker.Item label="Casa flotante" value="casaFlotante" />
            <Picker.Item label="Ecoalojamiento" value="ecoalojamiento" />
        </Picker>
        <Text style={styles.helperText}>
            Elijan dónde les gustaría alojarse, como en una casa, cabaña, hotel, camping, etc.
        </Text>
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
});

export default P3_Accommodation;
