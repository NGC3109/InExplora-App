import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import TabsContainer from '../../ui/Tabs';
import TextArea from '../../ui/Textarea';

const UpdateGroups = () => {
    const route = useRoute();
    const { group } = route.params;
    const currentUserId = useSelector(state => state.userReducer.user);
    const groupDetails = useSelector(state => state.groupReducer.groupDetails);
    const tabs = [
        { label: "Informacion", content: 
        <>
            <View style={styles.infoContainer}>
                <View style={styles.infoBlock}>
                    <View style={styles.infoItem}>
                    <Icon name="ruler-vertical" size={20} color="#6A994E" />
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Height</Text>
                        <Text style={styles.infoText}>{group.genre}</Text>
                    </View>
                    </View>
                    <View style={styles.infoItem}>
                    <Icon name="tint" size={20} color="#2C7DA0" />
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Water</Text>
                        <Text style={styles.infoText}>{group.budget}</Text>
                    </View>
                    </View>
                </View>
                <View style={styles.infoBlock}>
                    <View style={styles.infoItem}>
                    <Icon name="sun" size={20} color="#F2CC8F" />
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Light</Text>
                        <Text style={styles.infoText}>{group.accommodation}</Text>
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
        </> },
        {
          label: "Participantes",
          content: (
            <>
              {[
                { id: 1, name: "José Unda", profilePic: "https://via.placeholder.com/150" },
                { id: 2, name: "Sam Unda", profilePic: "https://via.placeholder.com/150" },
                { id: 3, name: "Aurora Unda", profilePic: "https://via.placeholder.com/150" },
                { id: 4, name: "Maritza Unda", profilePic: "https://via.placeholder.com/150" }
              ].map(participant => (
                <View key={participant.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                  <View style={{ marginRight: 16 }}>
                    <Image
                      source={{ uri: participant.profilePic }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  </View>
                  <Text style={{ flex: 1, fontWeight: 'bold' }}>{participant.name}</Text>
                  <TouchableWithoutFeedback onPress={() => console.log("Ver perfil de", participant.name)}><Text>Perfil</Text></TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => console.log("Eliminar", participant.name)} color="red"><Text>Eliminar</Text></TouchableWithoutFeedback>
                </View>
              ))}
            </>
          )
        }
    ];
    const [description, setDescription] = useState(group.description);

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
            <View>
                <Image
                    source={{ uri: group.profilePicture || 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg' }}
                    style={styles.image}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{group.title}</Text>
                <View style={styles.tagContainer}>
                    <Text style={styles.tag}>Indoor</Text>
                    <Text style={styles.tag}>Pet friendly</Text>
                    <Text style={styles.tag}>Papaveraceae</Text>
                </View>
                <Text style={styles.subtitle}>Description</Text>
                <TextArea 
                    placeholder="Descripción"
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
                <TabsContainer tabs={tabs} styles={myStyles} />
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>{group.isOwner ? 'Guardar cambios' : 'Abandonar grupo'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const myStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 15,
      backgroundColor: 'white'
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: 'blue',
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    tabContent: {
      flex: 1,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
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

export default UpdateGroups;
