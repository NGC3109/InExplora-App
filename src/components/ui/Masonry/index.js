import React from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const getRandomHeight = () => {
  return Math.floor(Math.random() * (350 - 200 + 1)) + 200;
};

const Masonry = ({ images }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.imageContainer, { height: getRandomHeight() }]}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.masonryContainer}
    />
  );
};

const styles = StyleSheet.create({
  masonryContainer: {
    paddingHorizontal: 4,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    width: (width / 2) - 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Masonry;
