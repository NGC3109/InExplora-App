import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions, View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { fetchThumbnails } from '../../actions/destinations/destinationsActions';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const getRandomHeight = () => {
  return Math.floor(Math.random() * (350 - 200 + 1)) + 200;
};

const Masonry = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { thumbnails, loading, error } = useSelector((state) => state.destinationsReducer);

  useEffect(() => {
    dispatch(fetchThumbnails());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  const formattedImages = thumbnails
    .filter(thumb => thumb.thumbnail) // Filtrar solo los que tienen thumbnail no vacío
    .map((thumb) => ({
      id: thumb._id,
      image: { uri: thumb.thumbnail },
      nombre: thumb.nombre,
      height: getRandomHeight(),
      width: (width / 2) - 8,
    }));

  return (
    <MasonryList
      data={formattedImages}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('detail_destiny', { destinyId: item.id })}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={[styles.image, { width: item.width, height: item.height }]}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{item.nombre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingHorizontal: 4 }}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
});

export default Masonry;
