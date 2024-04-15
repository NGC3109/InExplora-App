import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';
import CreateGroupTemplate from '../../../../../components/groups/steps/step9';

const CreateGroupContainer = ({ navigation }) => {
  const currentGroup = useSelector(state => state.groupReducer.groups);
  const [images, setImages] = useState([]);
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      multiple: true,
      selectionLimit: 5 - images.length,
    };
  
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const newSelected = response.assets.map(asset => asset.uri);
        setImages(prevImages => {
          const availableSlots = 5 - prevImages.length;
          const imagesToAdd = newSelected.slice(0, availableSlots);
          return [...prevImages, ...imagesToAdd];
        });
      }
    });
  };
  
  const removeImage = (index) => {
    // Filtrar las imágenes para excluir la imagen en la posición 'index'
    const filteredImages = images.filter((_, i) => i !== index);
    // Actualizar el estado con el nuevo arreglo de imágenes
    setImages(filteredImages);
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
    <>
        <CreateGroupTemplate 
            continueButton={continueButton}
            images={images}
            removeImage={removeImage}
            selectImage={selectImage}
            setImages={setImages}
        />
    </>
  );
}

export default CreateGroupContainer;
