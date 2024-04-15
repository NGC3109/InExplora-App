import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';

const Step9 = ({ navigation }) => {
  const currentGroup = useSelector(state => state.groupReducer.groups);
  const [images, setImages] = useState(Array(5).fill(null));

  const selectImage = (index) => {
    const options = {};
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const newImages = [...images];
        newImages[index] = response.assets[0].uri;
        setImages(newImages);
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
      <Text style={styles.label}>Portada</Text>
      <View style={styles.portadaContainer}>
        <TouchableOpacity onPress={() => selectImage(0)} style={styles.portadaPlaceholder}>
          {images[0] ? (
            <Image source={{ uri: images[0] }} style={styles.portadaImage} />
          ) : (
            <Image source={require('../../assets/placeholder-portada.jpg')} style={styles.portadaImage} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Galería</Text>
      <View style={styles.galleryContainer}>
        {images.slice(1).map((imgSrc, index) => (
          <TouchableOpacity key={`gallery_${index}`} onPress={() => selectImage(index + 1)} style={styles.galleryImagePlaceholder}>
            {imgSrc ? (
              <Image source={{ uri: imgSrc }} style={styles.galleryImage} />
            ) : (
              <Image source={require('../../assets/placeholder-galeria.jpg')} style={styles.galleryImage} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity style={styles.button} onPress={continueButton}>
        <Text style={styles.buttonText}>Publicar</Text>
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
    imagePlaceholder: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderRadius: 5,
      overflow: 'hidden',
    },
    button: {
      backgroundColor: '#5CB85D',
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
    portadaContainer: {
      marginBottom: 20,
    },
    portadaPlaceholder: {
      width: '100%',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e1e4e8',
      borderRadius: 10,
      overflow: 'hidden',
    },
    portadaImage: {
      width: '100%',
      height: '100%',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    galleryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    galleryImagePlaceholder: {
      width: '48%', // Ajustado para dos imágenes por fila
      height: 100,
      backgroundColor: '#e1e4e8',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
    },
    galleryImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });

export default Step9;
