import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { exploreMoreData, places } from './DataMock';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/home';

const Home = () => {
  const renderPlace = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.placeMeta}>
          <Text style={styles.placeCountry}>{item.country}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.placeRating}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const renderExploreMoreItem = ({ item }) => (
    <View style={styles.exploreCard}>
      <Image source={item.image} style={styles.exploreCardImage} />
      <View style={styles.exploreCardBody}>
        <Text style={styles.explorePlaceName}>{item.name}</Text>
        <View style={styles.explorePlaceDetails}>
          <Icon name="map-marker" size={14} color="#ff3b30" />
          <Text style={styles.explorePlaceCountry}>{item.country}</Text>
        </View>
        <View style={styles.userLikesRow}>
          {/* Suponiendo que tienes un arreglo de avatares en tus datos */}
          {item.userImages.map((avatar, index) => (
            <Image key={index} source={avatar} style={styles.avatarImage} />
          ))}
          <Text style={styles.likesCount}>{item.likes}</Text>
        </View>
      </View>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.container}>
      <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Buscar"
          />
        </View>
      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Categorias</Text>
        <View style={styles.categoriesList}>
          <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Montaña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Playa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Camping</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        horizontal
        data={places}
        renderItem={renderPlace}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.placesList}
      />
      <View style={styles.exploreMoreHeader}>
        <Text style={styles.exploreMoreTitle}>Explora</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>Ver todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={exploreMoreData}
      renderItem={renderExploreMoreItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      style={styles.exploreList}
    />

  );
};


export default Home;
