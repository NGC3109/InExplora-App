import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = [
  { id: '1', name: 'Top 20 destacados', icon: 'star' },
  { id: '2', name: 'Naturaleza', icon: 'tree' },
  { id: '3', name: 'Sol y Arena', icon: 'sun-o' },
];

const destinations = [
  { id: '1', name: 'Torres del Paine', image: require('../../../assets/bg1.jpg'), height: 200 },
  { id: '2', name: 'Torres del Paine', image: require('../../../assets/bg2.jpg'), height: 250 },
  { id: '3', name: 'Torres del Paine', image: require('../../../assets/bg3.jpg'), height: 300 },
  { id: '4', name: 'Torres del Paine', image: require('../../../assets/bg4.jpg'), height: 250 },
];

const hexImages = [
  { id: '1', name: 'Torres del Paine', image: require('../../../assets/hex1.png') },
  { id: '2', name: 'Torres del Paine', image: require('../../../assets/hex2.png') },
  { id: '3', name: 'Torres del Paine', image: require('../../../assets/hex2.png') },
];

const lastGroups = [
  { id: '1', name: 'Torres del Paine', image: require('../../../assets/bg4.jpg'), days: '4N/5D' },
  { id: '2', name: 'Torres del Paine', image: require('../../../assets/bg3.jpg'), days: '4N/5D' },
];

const hauntedDestinations = [
  { id: '1', name: 'Torres del Paine', image: require('../../../assets/bg2.jpg'), days: '4N/5D' },
  { id: '2', name: 'Torres del Paine', image: require('../../../assets/bg1.jpg'), days: '4N/5D' },
];

const HomeScreen = () => {
  const renderCategory = (item) => (
    <View key={item.id}>
      <TouchableOpacity style={styles.categoryContainer}>
        <Icon name={item.icon} size={24} color="#000" />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDestination = (item) => (
    <View key={item.id} style={[styles.destinationContainer, { height: item.height }]}>
      <Image source={item.image} style={styles.destinationImage} />
      <View style={styles.destinationOverlay}>
        <Icon name="heart" size={24} color="#fff" style={styles.heartIcon} />
        <Text style={styles.destinationName}>{item.name}</Text>
      </View>
    </View>
  );

  const renderHexImage = (item) => (
    <View key={item.id} style={styles.hexImageContainer}>
      <Image source={item.image} style={styles.hexImage} />
      <View style={styles.hexImageOverlay}>
        <Icon name="heart" size={24} color="#fff" style={styles.hexHeartIcon} />
        <Text style={styles.hexImageName}>{item.name}</Text>
      </View>
    </View>
  );

  const renderLastGroup = (item) => (
    <View key={item.id} style={styles.lastGroupContainer}>
      <Image source={item.image} style={styles.lastGroupImage} />
      <View style={styles.lastGroupOverlay}>
        <View style={styles.lastGroupHeader}>
          <Text style={styles.lastGroupName}>{item.name}</Text>
          <Icon name="heart" size={24} color="#fff" style={styles.heartIcon} />
        </View>
      </View>
      <Text style={styles.lastGroupDays}>{item.days}</Text>
    </View>
  );

  const renderHauntedDestination = (item) => (
    <View key={item.id} style={styles.hauntedDestinationContainer}>
      <Image source={item.image} style={styles.hauntedDestinationImage} />
      <View style={styles.hauntedDestinationOverlay}>
        <Icon name="heart" size={24} color="#fff" style={styles.hauntedHeartIcon} />
        <Text style={styles.hauntedDestinationName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="¿A dónde vamos?"
        />
        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
      </View>
      <Text style={styles.categoryTitle}>Categorías</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flatListContainer}>
        {categories.map(renderCategory)}
      </ScrollView>
      <Text style={styles.destinationTitle}>¿Dónde ir en invierno?</Text>
      <View style={styles.masonryContainer}>
        <View style={styles.column}>
          {destinations.filter((_, index) => index % 2 === 0).map(renderDestination)}
        </View>
        <View style={styles.column}>
          {destinations.filter((_, index) => index % 2 !== 0).map(renderDestination)}
        </View>
      </View>
      <Text style={styles.hexImageTitle}>Lugares increibles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hexImages.map(renderHexImage)}
      </ScrollView>
      <Text style={styles.lastGroupsTitle}>Últimos grupos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {lastGroups.map(renderLastGroup)}
      </ScrollView>
      <Text style={styles.hauntedTitle}>Destinos embrujados <Icon name="magic" size={16} color="#000" /></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hauntedDestinations.map(renderHauntedDestination)}
      </ScrollView>
      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    height: 50,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black'
  },
  flatListContainer: {
    paddingLeft: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 48,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
  },
  destinationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  destinationContainer: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  destinationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 8,
  },
  destinationName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heartIcon: {
    alignSelf: 'flex-end',
  },
  hexImageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  hexImageContainer: {
    width: 165,
    height: 190,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  hexImage: {
    width: '100%',
    height: '100%',
  },
  hexImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 8,
  },
  hexImageName: {
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  hexHeartIcon: {
    alignSelf: 'flex-end',
    marginTop: 40
  },
  lastGroupsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  lastGroupContainer: {
    width: 200,
    height: 250,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  lastGroupImage: {
    width: '100%',
    height: '100%',
  },
  lastGroupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 8,
  },
  lastGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastGroupName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  lastGroupDays: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#6b6b6b',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  hauntedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black'
  },
  hauntedDestinationContainer: {
    width: 300,
    height: 200,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  hauntedDestinationImage: {
    width: '100%',
    height: '100%',
  },
  hauntedDestinationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 8,
  },
  hauntedDestinationName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  hauntedHeartIcon: {
    alignSelf: 'flex-end',
  },
  footerSpace: {
    height: 30,
  },
});

export default HomeScreen;
