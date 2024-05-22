import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailGroup = ({ navigation, route }) => {
  const { groupItem } = route.params;

  const handleJoinGroup = () => {
    // Lógica para unirse al grupo
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: groupItem.profilePicture || 'https://via.placeholder.com/150' }}
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
            <View>
              <Text style={styles.title}>Viaje a Paris, Francia</Text>
              <Text style={styles.subtitle}>Saliendo desde Melipilla</Text>
            </View>
            <Image
              source={{ uri: groupItem.creatorProfilePicture || 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.description}>
            Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño...
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Icon name="hourglass-outline" size={24} color="#000" />
                <Text style={styles.infoText}>de 25 a 35 años</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="location-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Paris</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="people-outline" size={24} color="#000" />
                <Text style={styles.infoText}>4 maximo</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="cash-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Presupuesto</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="female-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Solo mujeres</Text>
              </View>
            </View>
            <View style={styles.infoColumn}>
              <View style={styles.infoRow}>
                <Icon name="bed-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Hostal</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="paw-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Sin mascotas</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="airplane-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Modo de viaje: Avion</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="navigate-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Desde Melipilla</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="calendar-outline" size={24} color="#000" />
                <Text style={styles.infoText}>Desde el 7/7/2024 hasta el 20/7/2024</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subtitle}>Integrantes</Text>
          <View style={styles.membersContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.memberImage} />
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.memberImage} />
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.memberImage} />
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.memberImage} />
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
            <Text style={styles.joinButtonText}>Quiero unirme!</Text>
          </TouchableOpacity>
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
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginVertical: 16,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
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
