import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DraftItem = ({ item, onContinue, onDiscard }) => {
  const {
    profilePicture = 'https://storage.googleapis.com/inexplora/bg-inexplora.jpg',
    destination = { description: '(Por definir)' },
    startingPlace = { startingTravel: '(Por definir)' },
    numberOfPeople = '(Por definir)',
    budget = '(Por definir)',
    genre = '(Por definir)'
  } = item || {};

  const formatAmount = (amount) => {
    if (typeof amount !== 'string' || !amount.match(/^\d+$/)) {
      return amount;
    }
    const numericAmount = parseInt(amount.replace(/\./g, ''), 10);
    if (numericAmount >= 1000000) {
      return `${(numericAmount / 1000000).toFixed(0)} Millon`;
    }
    return amount;
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.container}>
        <Image 
          source={{ uri: profilePicture }} 
          style={styles.articleImage} 
        />
        <Text style={styles.articleTitle}>
          Viaje a {destination.description}
        </Text>
        <Text>
          Saliendo desde {startingPlace.startingTravel}
        </Text>
        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <Icon name="people-outline" size={24} color="#3d444d" />
            <Text style={styles.footerText}>{numberOfPeople || '(Por definir)'}</Text>
          </View>
          <View style={styles.footerIcon}>
            <Icon name="cash-outline" size={24} color="#3d444d" />
            <Text style={styles.footerText}>{formatAmount(budget) || '(Por definir)'}</Text>
          </View>
          <View style={styles.footerIcon}>
            {genre === "Solo mujeres" && <Icon name="female-sharp" size={24} color="#3d444d" />}
            {genre === "Solo hombres" && <Icon name="male-sharp" size={24} color="#3d444d" />}
            {genre === "Mixto" && <Icon name="male-female-sharp" size={24} color="#3d444d" />}
            {genre === "(Por definir)" && <Text>(Por Definir)</Text>}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onDiscard}>
            <Text style={styles.buttonText}>Descartar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onContinue}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3d444d',
  },
  userArticles: {
    color: '#7d7d7d',
  },
  moreIcon: {
    paddingLeft: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3d444d',
    marginTop: 10,
  },
  articleTime: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#7d7d7d',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 5,
    color: '#7d7d7d',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    paddingTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#3d444d',
    fontWeight: 'bold',
  },
});

export default DraftItem;
