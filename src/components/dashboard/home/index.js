import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDestinationsBySeason, getDestinationsHaunted, getDestinationsAmazing } from '../../../actions/dashboard/dashboardActions';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../styles/destinos';
import io from 'socket.io-client';
import Config from 'react-native-config';

const socket = io(Config.SOCKET);

const categories = [
  { id: '1', name: 'Norte', icon: 'star' },
  { id: '2', name: 'Centro', icon: 'star' },
  { id: '3', name: 'Sur', icon: 'star' },
];

const lastGroups = [
  { id: '1', name: 'Torres del Paine', image: require('../../../assets/bg4.jpg'), days: '4N/5D' },
  { id: '2', name: 'Torres del Paine', image: require('../../../assets/bg3.jpg'), days: '4N/5D' },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const seasonDestinations = useSelector(state => state.dashboardReducer.seasonDestinations.data);
  const hauntedDestinations = useSelector(state => state.dashboardReducer.hauntedDestinations.data);
  const amazingPlaces = useSelector(state => state.dashboardReducer.amazingDestinations.data);
  const currentUserId = useSelector(state => state.userReducer.user);

  const [likedItems, setLikedItems] = useState({}); // { itemId: { likedByUser, likeId, totalLikes } }

  useEffect(() => {
    if (currentUserId?.id) {
      dispatch(getDestinationsBySeason(3, currentUserId.id));
      dispatch(getDestinationsHaunted(3, currentUserId.id));
      dispatch(getDestinationsAmazing(3, currentUserId.id));
    }
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (currentUserId?.id) {
      socket.emit('joinLikeable', { userId: currentUserId.id });
    }

    const handleNewLike = ({ likeableId, like, totalLikes }) => {
      setLikedItems(prevState => ({
        ...prevState,
        [likeableId]: { ...prevState[likeableId], likedByUser: true, likeId: like._id, totalLikes }
      }));
    };

    const handleRemoveLike = ({ likeableId, likeId, totalLikes }) => {
      setLikedItems(prevState => ({
        ...prevState,
        [likeableId]: { ...prevState[likeableId], likedByUser: false, likeId: null, totalLikes }
      }));
    };

    socket.on('newLike', handleNewLike);
    socket.on('newDislike', handleRemoveLike);

    socket.on('likeResponse', (response) => {
      if (response.success) {
        setLikedItems(prevState => ({
          ...prevState,
          [response.like.likeable]: { ...prevState[response.like.likeable], likedByUser: true, likeId: response.like._id, totalLikes: response.totalLikes }
        }));
      } else {
        console.error('Error liking item:', response.error);
      }
    });

    socket.on('dislikeResponse', (response) => {
      if (response.success) {
        setLikedItems(prevState => ({
          ...prevState,
          [response.likeableId]: { ...prevState[response.likeableId], likedByUser: false, likeId: null, totalLikes: response.totalLikes }
        }));
      } else {
        console.error('Error disliking item:', response.error);
      }
    });

    return () => {
      socket.off('newLike', handleNewLike);
      socket.off('newDislike', handleRemoveLike);
      socket.off('likeResponse');
      socket.off('dislikeResponse');
    };
  }, [currentUserId]);

  useEffect(() => {
    hauntedDestinations.forEach(item => {
      setLikedItems(prevState => ({
        ...prevState,
        [item._id]: { likedByUser: item.likedByUser, likeId: item.likeId || null }
      }));
    });
  }, [hauntedDestinations]);

  const handleLike = (item) => {
    if (currentUserId?.id) {
      socket.emit('likeGroup', { userId: currentUserId.id, likeableId: item._id, onModel: 'Destiny' });
    }
  };

  const handleDislike = (item) => {
    if (currentUserId?.id && likedItems[item._id]?.likeId) {
      socket.emit('dislikeGroup', { 
        userId: currentUserId.id,
        likeId: likedItems[item._id].likeId, 
        likeableId: item._id, 
        onModel: 'Destiny' 
      });
    } else {
      console.error('No likeId found for item:', item._id);
    }
  };

  const renderCategory = (item) => (
    <View key={item.id}>
      <TouchableOpacity style={styles.categoryContainer}>
        <Icon name={item.icon} size={24} color="#000" />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDestination = (item) => {
    const likedItem = likedItems[item._id] || item;
    return (
      <View key={item._id} style={[styles.destinationContainer, { height: 200 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('detail_destiny', { destinyId: item._id })}>
          <Image source={{ uri: item.thumbnail }} style={styles.destinationImage} />
          <View style={styles.destinationOverlay}>
            <TouchableOpacity onPress={() => likedItem.likedByUser ? handleDislike(item) : handleLike(item)}>
            {
                likedItem.likedByUser ?
                  (<Icon name="heart-sharp" size={24} color="#EF312E" style={styles.hauntedHeartIcon} />)
                :
                  (<Icon name="heart-outline" size={24} color="#3d444d" style={styles.hauntedHeartIcon} />)
              }
            </TouchableOpacity>
            <Text style={styles.destinationName}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHexImage = (item) => {
    const likedItem = likedItems[item._id] || item;
    return (
      <View key={item._id} style={styles.hexImageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('detail_destiny', { destinyId: item._id })}>
          <Image source={{ uri: item.thumbnail }} style={styles.hexImage} />
          <View style={styles.hexImageOverlay}>
            <TouchableOpacity onPress={() => likedItem.likedByUser ? handleDislike(item) : handleLike(item)}>
            {
                likedItem.likedByUser ?
                  (<Icon name="heart-sharp" size={24} color="#EF312E" style={styles.hexHeartIcon} />)
                :
                  (<Icon name="heart-outline" size={24} color="#3d444d" style={styles.hexHeartIcon} />)
              }
            </TouchableOpacity>
            <Text style={styles.hexImageName}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLastGroup = (item) => (
    <View key={item.id} style={styles.lastGroupContainer}>
      <TouchableOpacity>
        <Image source={item.image} style={styles.lastGroupImage} />
        <View style={styles.lastGroupOverlay}>
          <View style={styles.lastGroupHeader}>
            <Text style={styles.lastGroupName}>{item.name}</Text>
            <Icon name="heart" size={24} color="#fff" style={styles.heartIcon} />
          </View>
        </View>
        <Text style={styles.lastGroupDays}>{item.days}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHauntedDestination = (item) => {
    const likedItem = likedItems[item._id] || item;
    return (
      <View key={item._id} style={styles.hauntedDestinationContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('detail_destiny', { destinyId: item._id })}>
          <Image source={{ uri: item.thumbnail }} style={styles.hauntedDestinationImage} />
          <View style={styles.hauntedDestinationOverlay}>
            <TouchableOpacity onPress={() => likedItem.likedByUser ? handleDislike(item) : handleLike(item)}>
              {
                likedItem.likedByUser ?
                  (<Icon name="heart-sharp" size={24} color="#EF312E" style={styles.hauntedHeartIcon} />)
                :
                  (<Icon name="heart-outline" size={24} color="#3d444d" style={styles.hauntedHeartIcon} />)
              }
            </TouchableOpacity>
            <Text style={styles.hauntedDestinationName}>{item.nombre}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('search_home')}>
              <View style={styles.searchInputContainer}>
                  <Text style={styles.searchPlaceholder}>¿A dónde vamos?</Text>
              </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => navigation.navigate('search_home')}>
              <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
          </TouchableOpacity>
      </View>
      <Text style={styles.categoryTitle}>Categorías</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flatListContainer}>
        {categories.map(renderCategory)}
      </ScrollView>
      <Text style={styles.lastGroupsTitle}>Últimos grupos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {lastGroups.map(renderLastGroup)}
      </ScrollView>
      <Text style={styles.hexImageTitle}>Destinos embrujados</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hauntedDestinations.map(renderHexImage)}
      </ScrollView>
      <Text style={styles.destinationTitle}>¿Dónde ir en invierno?</Text>
      <View style={styles.masonryContainer}>
        <View style={styles.column}>
          {seasonDestinations.filter((_, index) => index % 2 === 0).map(renderDestination)}
        </View>
        <View style={styles.column}>
          {seasonDestinations.filter((_, index) => index % 2 !== 0).map(renderDestination)}
        </View>
      </View>
      <Text style={styles.hauntedTitle}>Lugares increíbles <Icon name="star" size={16} color="#000" /></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {amazingPlaces.map(renderHauntedDestination)}
      </ScrollView>
      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

export default HomeScreen;
