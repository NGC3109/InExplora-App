import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { IconTrash } from '../../../../assets/vectores';
import { styles } from '../../../../styles/groups/step9/loadingImages';

const LoadingImages = ({ images, removeImage, selectImage, continueButton }) => {
  const renderImageRows = () => {
    let rows = [];
    let elementsInRow = [];
    images.forEach((imageUri, index) => {
      elementsInRow.push(
        <ImageComponent key={index} imageUri={imageUri} index={index} removeImage={removeImage} />
      );
      if (elementsInRow.length === 2 || index === images.length - 1) {
        rows.push(
          <View key={index} style={styles.imageRow}>
            {elementsInRow}
            {elementsInRow.length === 1 && images.length !== 5 &&
              <TouchableOpacity style={styles.imageWrapper} onPress={selectImage}>
                <View style={styles.addMoreButton}>
                  <Text style={styles.addMoreIcon}>+</Text>
                  <Text style={styles.addMoreText}>Subir más</Text>
                </View>
              </TouchableOpacity>
            }
            {
              elementsInRow.length === 1 && images.length === 5 && 
                <TouchableOpacity style={styles.imageWrapper} onPress={selectImage}>
                </TouchableOpacity>
            }
          </View>
        );
        elementsInRow = [];
      }
    });
    if (images.length % 2 === 0 && images.length !== 5) {
        rows.push(
          <View key="add-more" style={styles.imageRow}>
            <TouchableOpacity style={styles.imageWrapper} onPress={selectImage}>
              <View style={styles.addMoreButton}>
                <Text style={styles.addMoreIcon}>+</Text>
                <Text style={styles.addMoreText}>Subir más</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.imageWrapper} />
          </View>
        );
    }
    return rows;
  };

  return (
      <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.imageContainer}
        showsVerticalScrollIndicator={false}
      >
          <View style={styles.center}>
            <Text style={styles.title}>Cargando imágenes</Text>
            <Text style={styles.counter}>{`${images.length} de ${images.length} imágenes`}</Text>
              {renderImageRows()}
          </View>
      </ScrollView>
      <TouchableOpacity style={styles.publishButton} onPress={continueButton}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>
      </View>
  );
};

const ImageComponent = ({ imageUri, index, removeImage }) => (
  <View style={styles.imageWrapper}>
    <Image source={{ uri: imageUri }} style={styles.image} />
    {index === 0 && (
      <View style={styles.coverLabel}>
        <Text style={styles.coverLabelText}>Portada</Text>
      </View>
    )}
    <TouchableOpacity style={styles.closeButton} onPress={() => removeImage(index)}>
      <IconTrash width="20" height="20" color="black" />
    </TouchableOpacity>
  </View>
);

export default LoadingImages;
