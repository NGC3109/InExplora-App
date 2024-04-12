import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CrearGrupo = ({ navigation }) => {
  const [producto, setProducto] = useState('');
  const [mapExpanded, setMapExpanded] = useState(false);
  const [region, setRegion] = useState({
    latitude: -50.9423262,
    longitude: -73.4067879,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const updateRegion = (searchText) => {
    setProducto(searchText);
    // La lógica para ajustar la región en base a los resultados de la búsqueda se iría aquí.
  };
  const toggleMapSize = () => {
    setMapExpanded(!mapExpanded);
  };
  const continueButton = () => {
    navigation.navigate('step2');
  }
  return (
    <View style={styles.container}>
      {/* Contenido del formulario */}
      <View>
        <Text style={styles.label}>¿A dónde te quieres ir de aventura?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej.: Torres del Paine"
          onChangeText={updateRegion}
          value={producto}
          maxLength={60}
        />
        <Text style={styles.helperText}>
          Evita incluir numeraciones.
        </Text>
      </View>
      
      {/* Vista previa del mapa */}
      <View style={mapExpanded ? styles.mapExpanded : styles.map}>
        <MapView
          style={StyleSheet.absoluteFill}
          region={region}
        />
        <TouchableOpacity style={styles.expandButton} onPress={toggleMapSize}>
          <Icon name="fullscreen" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* View vacía para empujar el botón hacia el fondo */}
      <View style={{ flex: 1 }} />

      {/* Botón al final de la pantalla */}
      <TouchableOpacity style={styles.button} onPress={() => continueButton()}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo amarillo de la imagen
    padding: 20, // Agrega un poco de padding alrededor
  },
  map: {
    width: width - 40, // Mismo ancho que el padding del contenedor
    height: 250, // Altura inicial del mapa
    marginTop: 10, // Espacio entre el mapa y otros elementos
  },
  mapExpanded: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    elevation: 3, // Solo para Android, para iOS utiliza shadow props
  },
  inputContainer: {
    marginTop: 20, // Ajusta esto según sea necesario
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white', // Fondo blanco para el input
    borderRadius: 5, // Bordes ligeramente redondeados
    padding: 10, // Espaciado interno del input
    fontSize: 16,
    marginBottom: 5, // Espaciado debajo del input
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

export default CrearGrupo;
