import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Config from 'react-native-config';
import CreateGroupTemplate from '../../../../components/groups/create/groupUpload';

const CreateGroupContainer = ({ navigation }) => {
  const currentGroup = useSelector(state => state.groupReducer.groups);
  const currentUserId = useSelector(state => state.userReducer.user);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const filteredImages = images.filter((_, i) => i !== index);
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
      if (typeof currentGroup[key] === 'object') {
        formData.append(key, JSON.stringify(currentGroup[key]));
      } else {
        formData.append(key, currentGroup[key]);
      }
    });
    formData.append('userId', currentUserId.id);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    try {
      const response = await axios.post(`${Config.API_ENDPOINT}groups/create`, formData, config);
      console.log('Upload successful', response.data);
      navigation.navigate('congratulations');
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const continueButton = () => {
    uploadAllImages();
    setLoading(true);
  };

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <View style={styles.overlay} />
          <ActivityIndicator size="large" color="#0000ff" style={styles.indicator} />
        </View>
      )}
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

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  indicator: {
    zIndex: 11,
  },
});

export default CreateGroupContainer;
