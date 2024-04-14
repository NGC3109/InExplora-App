import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

const Step9 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState(Array(5).fill(null));

  const continueButton = () => {
    
    navigation.navigate('congratulations');
  };

  const selectImage = (index) => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        const newImages = [...images];
        newImages[index] = source.uri;
        setImages(newImages);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Suba hasta 5 fotografías del destino de su viaje.</Text>
      {/* Foto de portada */}
      <TouchableOpacity onPress={() => selectImage(0)} style={[styles.imagePlaceholder, styles.portada]}>
        {images[0] ? (
          <Image source={{ uri: images[0] }} style={StyleSheet.absoluteFill} />
        ) : (
          <Text>Portada (Imagen 1)</Text>
        )}
      </TouchableOpacity>
      {/* Fotos de la galería */}
      <View style={styles.galleryContainer}>
        {images.slice(1).map((imgSrc, index) => (
          <TouchableOpacity key={index} onPress={() => selectImage(index + 1)} style={styles.galleryImagePlaceholder}>
            {imgSrc ? (
              <Image source={{ uri: imgSrc }} style={StyleSheet.absoluteFillObject} />
            ) : (
              <Text>Galería (Imagen {index + 2})</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.helperText}>
        La primera imagen será la de portada. Las imágenes pueden ayudar a motivar a otros a unirse a su aventura.
      </Text>
      <TouchableOpacity style={styles.button} onPress={continueButton}>
        <Text style={styles.buttonText}>Publicar</Text>
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
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden', // Asegura que la imagen no sobrepase los bordes redondeados
  },
  portada: {
    width: '100%',
    height: 200, // Altura específica para la portada
    backgroundColor: '#e1e4e8',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryImagePlaceholder: {
    width: '48%', // Ajustado para tener en cuenta el espaciado
    height: 100,
    backgroundColor: '#e1e4e8',
    marginBottom: 10,
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
});

export default Step9;
