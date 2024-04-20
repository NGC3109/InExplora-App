import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { loadGroupById, requestToJoinGroup } from '../actions/groups/groupAction';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DetailGroup = ({ route }) => {
  const { groupId } = route.params;
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.userReducer.user);
  const groupDetails = useSelector(state => state.groupReducer.groupDetails);

  const handleJoinGroup = () => {
    const message = "Me gustaría unirme a su grupo porque...";
    const superPower = "Organización de viajes";
    console.log('click')
    dispatch(requestToJoinGroup(currentUserId.id, groupId, message, superPower));
  };

  useEffect(() => {
    if (groupId) {
      dispatch(loadGroupById(groupId));
    }
  }, [dispatch, groupId]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: groupDetails?.data?.profilePicture || 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg' }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => handleJoinGroup()}>
                <Text style={styles.bannerText}>Solicitar unirme al grupo</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{groupDetails?.data?.title}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Indoor</Text>
            <Text style={styles.tag}>Pet friendly</Text>
            <Text style={styles.tag}>Papaveraceae</Text>
          </View>
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.description}>
            {groupDetails?.data?.description}
          </Text>
          {/* Aquí agregarías el resto de los elementos como 'Height', 'Water', etc. */}
          <View style={styles.infoContainer}>
            <View style={styles.infoBlock}>
                <View style={styles.infoItem}>
                <Icon name="ruler-vertical" size={20} color="#6A994E" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Height</Text>
                    <Text style={styles.infoText}>Small</Text>
                </View>
                </View>
                <View style={styles.infoItem}>
                <Icon name="tint" size={20} color="#2C7DA0" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Water</Text>
                    <Text style={styles.infoText}>333ml</Text>
                </View>
                </View>
            </View>
            <View style={styles.infoBlock}>
                <View style={styles.infoItem}>
                <Icon name="sun" size={20} color="#F2CC8F" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Light</Text>
                    <Text style={styles.infoText}>Normal</Text>
                </View>
                </View>
                <View style={styles.infoItem}>
                <Icon name="thermometer-half" size={20} color="#A44A3F" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Humidity</Text>
                    <Text style={styles.infoText}>56%</Text>
                </View>
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save this plant</Text>
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
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20, // Este margen es para que el contenido no se superponga en la imagen
  },
  image: {
    width: '100%',
    height: 300,
  },
  overlay: {
    position: 'absolute',
    top: 250, // Debe coincidir aproximadamente con el punto donde termina la imagen
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20, // Añade padding para separar el texto del borde
    backgroundColor: 'white'
  },
  bannerText: {
    backgroundColor: '#00A676',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    fontSize: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#E8E8E8',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoBlock: {
    flexDirection: 'column',
    width: '50%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContent: {
    marginLeft: 10, // Espacio entre el icono y el texto
    alignItems: 'flex-start',
  },
  infoTitle: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#5CAD40',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    // Agrega sombra al botón
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // ... añade aquí más estilos para otros elementos ...
});

export default DetailGroup;
