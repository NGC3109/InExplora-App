import React from 'react';
import { View, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Gallery = ({ images }) => {
  const scrollX = useSharedValue(0);

  const handleScroll = (event) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.progressBar}>
        {images.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const widthInterpolation = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [10, 30, 10],
              Extrapolate.CLAMP
            );
            const opacityInterpolation = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP
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
  galleryContainer: {
    width: '100%',
  },
  imageContainer: {
    width,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  progressIndicator: {
    height: 5,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 5,
  },
});

export default Gallery;
