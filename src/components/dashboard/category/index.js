import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { fetchCategoryByRegion } from '../../../actions/category/categoryActions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRandomHeight } from '../../../utils/functions';
import Loading from '../../ui/Loading';

const { width } = Dimensions.get('window');

const Categories = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { categories = [], loading, error } = useSelector(state => state.categoryReducer); // Default value to empty array
  const { region } = route.params;
  useEffect(() => {
    dispatch(fetchCategoryByRegion(region));
  }, [dispatch, region]);

  if (loading) {
    return (
            <Loading 
              url="https://storage.googleapis.com/inexplora/inexplora-recursos/loading.gif"
              size="s"
              text="Cargando..."
            />
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  const formattedImages = categories.map((thumb) => ({
    id: thumb._id,
    image: { uri: thumb.thumbnail || 'https://via.placeholder.com/150' },
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
    color: '#000',
  },
});

export default Categories;
