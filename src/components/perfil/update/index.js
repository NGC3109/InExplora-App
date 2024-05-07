import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UpdateUser() {
  const [descriptionHeight, setDescriptionHeight] = useState(60); // Altura inicial de 60

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicContainer}>
        <Text>📷</Text>
        <Text style={styles.changePicText}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.descriptionInput, { height: Math.max(60, descriptionHeight) }]} // Aplicar la altura dinámica
        placeholder="Descripción"
        multiline
        onContentSizeChange={(event) => {
          setDescriptionHeight(event.nativeEvent.contentSize.height); // Actualizar la altura según el contenido
        }}
      />
      <View style={styles.interestsContainer}>
        <Text style={styles.interestsLabel}>Intereses</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Universo</Text>
          <Text style={styles.tag}>Playa</Text>
          <Text style={styles.tag}>Instrumentos</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Agregar más..."
        />
      </View>
      <View style={styles.interestsContainer}>
        <Text style={styles.interestsLabel}>Super Poderes</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Traductor Universal</Text>
          <Text style={styles.tag}>Cocinero</Text>
          <Text style={styles.tag}>Fotografía Perfecta</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Agregar más..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  profilePicContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  changePicText: {
    color: '#000',
    textDecorationLine: 'underline'
  },
  descriptionInput: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10
  },
  interestsContainer: {
    marginBottom: 20
  },
  interestsLabel: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tag: {
    marginRight: 10,
    backgroundColor: '#283439',
    color: '#FFF',
    padding: 5,
    borderRadius: 15
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  }
});
