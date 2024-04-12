import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Step8 = ({ navigation }) => {
  const [descripcion, setDescripcion] = useState('');
  const limiteCaracteres = 300;

  const continueButton = () => {
    navigation.navigate('step9');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Redacte una descripción que inspire a otras personas a unirse a su grupo de viaje.</Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setDescripcion(text)}
          value={descripcion}
          maxLength={limiteCaracteres}
          placeholder="Describe tu viaje aquí..."
        />
        <Text style={styles.caracteresLimit}>{`${descripcion.length}/${limiteCaracteres}`}</Text>
        <Text style={styles.helperText}>
            Compartan lo que hace especial a este viaje y por qué otros deberían unirse.
        </Text>
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
  textarea: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    height: 100, // Altura fija para asegurar espacio suficiente para escribir
    textAlignVertical: 'top', // Alinea el texto al inicio en Android
  },
  caracteresLimit: {
    textAlign: 'right',
    marginBottom: 20,
  },
  helperText: {
    fontSize: 12,
    color: 'grey',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default Step8;
