import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Select, CheckIcon, NativeBaseProvider, FormControl, Input } from "native-base";
import { dataImg, styles, filters } from './DataMock';
import FiltersContainer from '../components/FiltersContainer'; // Importa el componente FiltersContainer

const Grupos = () => {
  const [service, setService] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const renderGridItem = useCallback(({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
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
            data={dataImg}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default Grupos;
