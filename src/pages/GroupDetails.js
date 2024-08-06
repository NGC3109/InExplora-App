import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroupById } from '../actions/groups/groupAction';
import ImageGallery from '../components/ui/ImageGallery';
import { formatToThousands } from '../utils/functions';
import ButtonWithIcon from '../components/ui/ButtonWithIcon';
import { AlertInfo, AlertSuccess } from '../components/ui/Alert';
import Loading from '../components/ui/Loading';

const DetailGroup = ({ navigation, route }) => {
  const { groupId } = route.params;
  const dispatch = useDispatch();
  const groupDetails = useSelector(state => state.groupReducer.groupDetails?.data);
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
    if (groupId) {
      dispatch(loadGroupById(groupId, currentUserId.id));
    }
  }, [dispatch, groupId]);

  const handleJoinGroup = () => {
    navigation.navigate('join_step1', {
      groupId: groupId,
      userCreator: groupDetails?.userCreator
    });
  };

  if (!groupDetails) {
    return (
      <Loading 
      url="https://storage.googleapis.com/inexplora/inexplora-recursos/loading.gif"
      size="s"
      text="Cargando..."
      />
    );
  }

  const { 
    title, 
    description, 
    emptySpots, 
    startingTravelText, 
    creatorDetails, 
    userIsMember, 
    ageRange, 
    destination, 
    numberOfPeople, 
    budget, 
    genre, 
    accommodation, 
    travelWithPets, 
    travelMode, 
    members = [],
    gallery = [],
    formattedStartDate,
    formattedEndDate,
    request,
  } = groupDetails;

  // Verificación de la galería
  if (!Array.isArray(gallery)) {
    console.error('La galería no es un array:', gallery);
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: la galería no es un array</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={request === 'pending' || userIsMember ? styles.scrollWithPending : styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <ImageGallery images={gallery} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={30} color="#000" />
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
          
          {/* Sección de Detalles del Viaje */}
          <Text style={styles.sectionTitle}>Detalles del Viaje</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Icon name="hourglass-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>De {ageRange?.min} a {ageRange?.max} años</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="location-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{destination?.description}</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="people-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{numberOfPeople} máximo</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="cash-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{formatToThousands(budget)}</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="female-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{genre}</Text>
            </View>
          </View>

          {/* Sección de Alojamiento y Transporte */}
          <Text style={styles.sectionTitle}>Alojamiento y Transporte</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Icon name="bed-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{accommodation}</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="paw-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{travelWithPets?.incluyeMascotas ? 'Se permiten mascotas' : 'Sin Mascotas'}</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="airplane-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>{travelMode?.travelMode}</Text>
            </View>
            <View style={styles.sectionItem}>
              <Icon name="navigate-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>Desde {startingTravelText}</Text>
            </View>
          </View>

          {/* Sección de Fechas */}
          <Text style={styles.sectionTitle}>Fechas</Text>
          <View style={styles.sectionContent}>
            <View style={styles.sectionItem}>
              <Icon name="calendar-outline" size={18} color="white" />
              <Text style={styles.sectionItemText}>Desde el {formattedStartDate} hasta el {formattedEndDate}</Text>
            </View>
          </View>

          {/* Sección de Integrantes */}
          <Text style={styles.sectionTitle}>Integrantes</Text>
          <View style={styles.membersContainer}>
            {members.map((member, index) => (
              <Image key={index} source={{ uri: member.profilePicture }} style={styles.memberImage} />
            ))}
            {Array.from({ length: emptySpots }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.memberImagePlaceholder}>
                <Text style={{color: '#021121'}}>Vacío</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {!userIsMember ? (
        request === 'pending' ? (
          <AlertInfo 
            Customstyle={{ height: 50 }} 
            type="info" 
            message="Ya has enviado una solicitud para unirte a este grupo" 
          />
        ) : (
          <View style={styles.fixedButtonContainer}>
            <ButtonWithIcon 
              handleClick={handleJoinGroup}
              title="Quiero unirme!" 
              width="100%" 
              height={50} 
            />
          </View>
        )
      ) : (
        <AlertSuccess 
          Customstyle={{ height: 50 }} 
          type="success" 
          message="Ya eres miembro de este grupo" 
        />
      )}
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
    paddingBottom: 80, // Para evitar que el contenido se superponga al botón fijo
  },
  scrollWithPending: {
    flexGrow: 1,
    paddingBottom: 0, // Para evitar que el contenido se superponga al botón fijo
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
    color: '#021121',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#414141',
    marginVertical: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#021121',
    marginVertical: 10,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021121',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  sectionItemText: {
    color: 'white',
    marginLeft: 5,
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
    borderColor: '#021121',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
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
