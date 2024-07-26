import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { fetchCategoryByRegion } from '../../../actions/category/categoryActions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRandomHeight } from '../../../utils/functions';

const { width } = Dimensions.get('window');

const Categories = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { categories = [], loading, error } = useSelector(state => state.categoryReducer); // Default value to empty array
  const { region } = route.params;
    console.log('categories: ',categories)
  useEffect(() => {
    dispatch(fetchCategoryByRegion(region));
  }, [dispatch, region]);

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

  const formattedImages = categories.map((thumb) => ({
    id: thumb._id,
    image: { uri: thumb.thumbnail || 'https://via.placeholder.com/150' },
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
          <Image
            source={item.image}
            style={{
              width: item.width,
              height: item.height,
              margin: 4,
              resizeMode: 'cover',
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingHorizontal: 4 }}
    />
  );
};

export default Categories;
