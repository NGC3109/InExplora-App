
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { fetchThumbnails } from '../../actions/destinations/destinationsActions';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const getRandomHeight = () => {
  return Math.floor(Math.random() * (350 - 200 + 1)) + 200;
};

const Masonry = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
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
      height: getRandomHeight(),
      width: (width / 2) - 8,
    }));

  return (
    <MasonryList
      data={formattedImages}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('detail_destiny', {destinyId: item.id})}>
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

export default Masonry;
