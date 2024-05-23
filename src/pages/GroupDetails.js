import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroupById } from '../actions/groups/groupAction';

const DetailGroup = ({ navigation, route }) => {
  const { groupId } = route.params;
  const dispatch = useDispatch();
  const groupDetails = useSelector(state => state.groupReducer.groupDetails?.data);
  const userId = useSelector(state => state.userReducer.userId);

  useEffect(() => {
    if (groupId) {
      dispatch(loadGroupById(groupId));
    }
  }, [dispatch, groupId]);

  const handleJoinGroup = () => {
    navigation.navigate('join_step1', {
      groupId: groupId
    });
  };

  if (!groupDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const { profilePicture, title, startingPlace, description, creatorDetails, ageRange, destination, numberOfPeople, budget, genre, accommodation, travelWithPets, travelMode, startingTravel, members = [] } = groupDetails;

  const userIsMember = members.some(member => member._id === userId);
  const emptySpots = numberOfPeople - members.length;

  const startingTravelText = startingPlace?.startingTravel.split('-')[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
            style={styles.headerImage}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Icon name="bookmark-outline" size={30} color="#fff" />
          </View>
        </View>
        <View style={styles.curvedContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>Saliendo desde {startingTravelText}</Text>
            </View>
            <Image
              source={{ uri: creatorDetails?.profilePicture || 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Icon name="hourglass-outline" size={24} color="#000" />
                <Text style={styles.infoText}>de {ageRange?.min} a {ageRange?.max} años</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="location-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{destination?.description}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="people-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{numberOfPeople} maximo</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="cash-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{budget}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="female-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{genre}</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Icon name="bed-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{accommodation}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="paw-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{travelWithPets?.incluyeMascotas ? 'Se permiten mascotas' : 'Sin Mascotas'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="airplane-outline" size={24} color="#000" />
                <Text style={styles.infoText}>{travelMode?.travelMode}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="navigate-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Desde {startingTravelText}</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="calendar-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Desde el 7/7/2024 hasta el 20/7/2024</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subtitle}>Integrantes</Text>
          <View style={styles.membersContainer}>
            {members.map((member, index) => (
              <Image key={index} source={{ uri: member.profilePicture }} style={styles.memberImage} />
            ))}
            {Array.from({ length: emptySpots }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.memberImagePlaceholder}>
                <Text>Vacio</Text>
              </View>
            ))}
          </View>
          {!userIsMember && (
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
              <Text style={styles.joinButtonText}>Quiero unirme!</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  curvedContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    padding: 16,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  membersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  memberImage: {
    width: 65,
    height: 65,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 8,
  },
  memberImagePlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  joinButton: {
    backgroundColor: '#5CAD40',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DetailGroup;
