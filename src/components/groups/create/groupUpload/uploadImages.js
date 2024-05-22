import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconPlus from '../../../../assets/vectores/IconPlus';

const UploadImages = ({ selectImage, continueButton }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Agrega la esencia de tu próxima aventura</Text>
      <Text style={styles.description}>
        Selecciona hasta 5 de tus mejores fotos para compartir la visión única de tu viaje y encender la chispa de la exploración.
      </Text>
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
            <Text style={styles.uploadButtonText}>
            <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                <IconPlus />
                </View>
                <Text style={styles.buttonText}>Subir imágenes</Text>
            </View>
            </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity disabled style={styles.publishButton} onPress={continueButton}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  // ... tus otros estilos ...
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    width: '70%'
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 50,
    color: '#413A3A'
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  uploadButton: {
    alignItems: 'center',
    borderRadius:13,
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 20,
    borderColor: '#DDD',
    borderWidth: 0.5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  uploadButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'regular',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10, // ajusta la distancia entre el icono y el texto
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'regular',
  },
  publishButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto', // Esto asegura que el botón se quede en la parte inferior
  },
  publishButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default UploadImages;
