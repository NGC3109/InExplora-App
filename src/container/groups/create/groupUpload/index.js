import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { uploadAllImages } from '../../../../actions/groups/groupAction';
import CreateGroupTemplate from '../../../../components/groups/create/groupUpload';
import Loading from '../../../../components/ui/Loading';

const CreateGroupContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentGroup = useSelector(state => state.groupReducer.groups);
  const currentUserId = useSelector(state => state.userReducer.user);
  const uploading = useSelector(state => state.groupReducer.uploading);
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
    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
  };

  const continueButton = () => {
    dispatch(uploadAllImages(images, currentGroup, currentUserId, navigation));
  };
  return (
    <>
      {uploading && (
         <Loading 
            url="https://storage.googleapis.com/inexplora/inexplora-recursos/loading.gif"
            size="s"
            text="Cargando..."
          />
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
