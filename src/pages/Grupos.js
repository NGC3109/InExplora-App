import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider, FormControl, Input } from "native-base";
import { dataImg, styles, filters } from './DataMock';
import FiltersContainer from '../components/FiltersContainer'; // Importa el componente FiltersContainer
import { loadGroups } from '../actions/groups/groupAction';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Grupos = ({ navigation }) => {
  const dispatch = useDispatch();
  const [service, setService] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const groupsData = useSelector(state => state.groupReducer.allGroups); // Acceder al estado de los grupos

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
          <Text style={styles.cardTitle}>Title</Text>
          <Text style={styles.cardSubTitle}>Subtitle</Text>
          <Text style={styles.cardPrice}>from $15.500 per adult</Text>
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
  console.log('groupsData: ', groupsData)
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.profileDescription}>
            Aquí puedes agregar una descripción sobre el perfil del usuario...
          </Text>
          <View style={styles.inputsContainer}>
            <View style={styles.selectContainer}>
              <Select
                selectedValue={service}
                minWidth="50"
                accessibilityLabel="País"
                placeholder="País"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="1" />
                }}
                onValueChange={itemValue => setService(itemValue)}
              >
                {["Chile", "Argentina", "Brasil", "Paraguay", "Uruguay"].map((country, index) => (
                  <Select.Item key={index} label={country} value={country.toLowerCase()} />
                ))}
              </Select>
            </View>
            <View style={styles.inputContainer}>
              <FormControl>
                <Input
                  placeholder="Destino"
                  value={destination}
                  onChangeText={text => setDestination(text)}
                />
              </FormControl>
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
              <Text style={styles.filterButtonText}>Filtros</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Aplicar filtros</Text>
          </TouchableOpacity>
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
export default Grupos;
