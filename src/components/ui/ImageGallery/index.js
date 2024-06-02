// src/components/ImageGallery/ImageGallery.js
import React from 'react';
import { View, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ImageGallery = ({ images }) => {
  const scrollX = useSharedValue(0);

  const handleScroll = (event) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
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
});

export default ImageGallery;
