import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const ImageGallery = ({ images }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const handleImagePress = (index) => {
    setScrollIndex(index);
    setIsExpanded(true);
  };

  const handleClosePress = () => {
    setIsExpanded(false);
  };

  const renderGallery = (imageStyle) => (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => (
        <TouchableWithoutFeedback onPress={() => handleImagePress(index)}>
          <View>
            <Image source={{ uri: item }} style={imageStyle} />
          </View>
        </TouchableWithoutFeedback>
      )}
      initialScrollIndex={scrollIndex}
    />
  );

  return (
    <View>
      {renderGallery(styles.image)}
      <Modal visible={isExpanded} transparent={true}>
        <View style={styles.expandedContainer}>
          <TouchableWithoutFeedback onPress={handleClosePress}>
            <View style={styles.closeButtonContainer}>
              <Icon name="close-circle" size={40} color="white" style={styles.closeButton} />
            </View>
          </TouchableWithoutFeedback>
          {renderGallery(styles.expandedImage)}
        </View>
      </Modal>
      <View style={styles.progressBar}>
        {images.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const widthInterpolation = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [10, 30, 10]
            );
            const opacityInterpolation = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.5, 1, 0.5]
            );

            return {
              width: widthInterpolation,
              opacity: opacityInterpolation,
            };
          });

          return <Animated.View key={index} style={[styles.progressIndicator, animatedStyle]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height: 400,
    resizeMode: 'cover',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 370, // Ajusta este valor según el tamaño de tu imagen
    width: '100%',
  },
  progressIndicator: {
    height: 5,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  expandedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    padding: 10,
  },
  expandedImage: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
});

export default ImageGallery;
