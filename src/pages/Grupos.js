import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider, FormControl, Input } from "native-base";
import { dataImg, filters } from './DataMock';
import FiltersContainer from '../components/FiltersContainer'; // Importa el componente FiltersContainer
import { loadGroups } from '../actions/groups/groupAction';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FiltrosComponent from '../components/ui/Filtros';
import { IconHeartFill } from '../assets/vectores';

const Grupos2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const [service, setService] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const groupsData = useSelector(state => state.groupReducer.allGroups); // Acceder al estado de los grupos
console.log('groupsData: ', groupsData)
  useEffect(() => {
    dispatch(loadGroups()); // Despachar la acción para cargar grupos cuando el componente se monta
  }, [dispatch]);

  const goDetailsGroup = (item) => {
    navigation.navigate('detalleGrupo', { groupId: item._id })
  }

  const renderGridItem = useCallback(({ item }) => (
    <TouchableWithoutFeedback onPress={() => goDetailsGroup(item)}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.profilePicture || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardTitle}>{item.title || "No Especificada"}</Text>
          <Text style={styles.cardSubTitle}>Salida: {item.startingPlace.startingTravel || "No Especificada"}</Text>
          <Text style={styles.cardSubTitle}>Presupuesto: ${item.budget || "0"}</Text>
          <Text style={styles.cardSubTitle}>Max personas: {item.numberOfPeople || "0"}</Text>
          <Text style={styles.cardSubTitle}>Duracion: 7 días</Text>
          <Text style={styles.cardSubTitle}>{'de ' + item.ageRange.min + ' años a ' + item.ageRange.max + ' años' || "0"}</Text>
          
          <View style={styles.cardInteractions}>
            <View style={styles.userAvatars}>
              {/* Renderizar los avatares aquí */}
            </View>
            <View style={styles.likesContainer}>
              <IconHeartFill />
              <Text style={styles.likesText}> 178</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ), []);
  

  const applyFilters = useCallback(() => {
    console.log("Filtros aplicados:", selectedFilters);
  }, [selectedFilters]);

  const toggleFilters = useCallback(() => {
    setShowFilters(prevState => !prevState);
  }, []);

  const handleSelectChange = useCallback((filterId, itemValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterId]: itemValue === "Seleccionar" ? "" : itemValue
    }));
  }, []);
  return (
    <NativeBaseProvider>
      <FiltrosComponent />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
        </View>
        {showFilters && (
          <FiltersContainer // Usa el componente FiltersContainer
            filters={filters}
            selectedFilters={selectedFilters}
            handleSelectChange={handleSelectChange}
          />
        )}
        <View style={styles.tabContent}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            data={groupsData?.data}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white'
  },
  tabContent:{
    marginHorizontal: 10
  },
  // ...otros estilos
  cardContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10, // Añade un margen para que la sombra no se corte
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 10.62,
  
    // Sombra para Android
    elevation: 4,
  },
  cardImage: {
    width: '40%',
    height: 150,
    // ajustar según sea necesario
  },
  cardDetailsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // ajustar según sea necesario
  },
  cardSubTitle: {
    fontSize: 14,
    // ajustar según sea necesario
  },
  cardInteractions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // ajustar según sea necesario
  },
  userAvatars: {
    // Estilo para contenedor de avatares
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // ajustar según sea necesario
  },
  likesText: {
    // Estilo para el texto de 'likes'
  }
});

export default Grupos2;
