import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';
import IconPlus from '../../assets/vectores/IconPlus';
import LoadingImages from '../../components/groups/steps/step9/loadingImages';

const Step9 = ({ navigation }) => {
  const currentGroup = useSelector(state => state.groupReducer.groups);
  const [images, setImages] = useState(Array(5).fill(null));

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      multiple: true,
      selectionLimit: 5, // Intentar limitar a 5 imágenes desde la galería
    };
  
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const selected = response.assets.map(asset => asset.uri);
        if (selected.length > 5) {
          // Si por alguna razón se seleccionaron más de 5 imágenes, tomar solo las primeras 5
          setImages(selected.slice(0, 5));
        } else {
          setImages(selected);
        }
      }
    });
  };

  const uploadAllImages = async () => {
    const formData = new FormData();
    images.forEach((imageUri, index) => {
      if (imageUri) {
        formData.append('images', {
          uri: imageUri,
          type: 'image/jpeg',
          name: `photo_${index}.jpg`,
        });
      }
    });

    Object.keys(currentGroup).forEach(key => {
      formData.append(key, currentGroup[key]);
    });

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
      const response = await axios.post(`${Config.API_ENDPOINT}groups/create`, formData, config);
      console.log('Upload successful', response.data);
      navigation.navigate('congratulations');
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const continueButton = () => {
    uploadAllImages(); // Sube todas las imágenes cuando se presiona este botón
  };
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
      <View style={styles.previewContainer}>
        {/* Renderizar las imágenes seleccionadas aquí */}
      </View>
      <TouchableOpacity  style={styles.publishButton} onPress={continueButton}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>
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

export default Step9;
