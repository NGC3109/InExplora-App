import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { saveGroupTravelWithChildren } from '../../actions/groups/groupAction';

const P6_GroupTravelWithChildren = ({ navigation }) => {
  const dispatch = useDispatch();
  const [incluyeMenores, setIncluyeMenores] = useState('');
  const [edadMayorMenor, setEdadMayorMenor] = useState(0);

  const handleIncluyeMenoresChange = (itemValue) => {
    setIncluyeMenores(itemValue);
  };

  const continueButton = () => {
    dispatch(saveGroupTravelWithChildren(incluyeMenores))
    navigation.navigate('step7');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>¿Incluirán niñas/niños/adolescentes en su viaje?</Text>
        <Picker
          selectedValue={incluyeMenores}
          onValueChange={handleIncluyeMenoresChange}
          style={styles.picker}
        >
            <Picker.Item label="No" value="no" />
          <Picker.Item label="Sí" value="si" />
        </Picker>
        <Text style={styles.helperText}>
          Seleccionen si viajarán con niñas/niños/adolescentes.
        </Text>
        {incluyeMenores === 'si' && (
          <View>
            <Text style={styles.label}>¿Que edad tiene?</Text>
            <Picker
              selectedValue={edadMayorMenor}
              onValueChange={(itemValue) => setEdadMayorMenor(itemValue)}
              style={styles.picker}
            >
              {Array.from({ length: 18 }, (_, i) => i).map(value => (
                  <Picker.Item key={value} label={`${value} años`} value={value} />
              ))}
            </Picker>
            <Text style={styles.helperText}>
              Si viaja con más de uno, seleccione la edad del o la mayor.
            </Text>
          </View>
        )}
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

export default P6_GroupTravelWithChildren;
