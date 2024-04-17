import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome';

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};
const Autocomplete = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        if(!predictions.length > 0){
            setPredictions('')
        }
    }, [predictions])
    const debouncedSearch = useCallback(
        debounce((text) => {
          const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${Config.API_KEY_MAPS}&language=es&input=${encodeURIComponent(text)}`;
          fetch(apiUrl)
              .then((response) => response.json())
              .then((json) => {
                  setPredictions(json.predictions);
              })
              .catch((error) => {
                  console.error(error);
              });
        }, 500),
        []
      );

    const handleSearch = (text) => {
        setQuery(text);
        if (text.length > 3) {
            debouncedSearch(text);
        } else {
            setPredictions([]); 
        }
    };
    const handleKeyPress = () => {
          setQuery('');
          setPredictions([]);
    };
    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name='search' size={20} color="#000" />
                <TextInput
                    value={query}
                    onChangeText={handleSearch}
                    style={styles.textInput}
                    onFocus={handleKeyPress}
                />
            </View>
            <Text style={styles.infoText}>¿Desde donde inicia la aventura?</Text>
            <FlatList
                data={predictions}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelect(item.description, item.place_id)} style={styles.predictionItem}>
                        <Text style={styles.predictionText}>{item.description}</Text>
                    </TouchableOpacity>
                )}
                style={styles.predictionsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 50, // Altura del TextInput
        fontSize: 16,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Config.COLOR_LABEL,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 20, // Ajusta para posicionar el texto correctamente
    },
    infoText: {
        position: 'absolute',
        top: 10,
        left: 20, // Ajusta según necesidades
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        fontSize: 12,
        color: Config.COLOR_LABEL,
    },
    predictionsList: {
        // Aplica estilos según tu diseño, si es necesario
    },
    predictionItem: {
        backgroundColor: '#FFFFFF', // Fondo de las predicciones
        padding: 15, // Padding del contenedor
        borderBottomWidth: 1, // Grosor del borde inferior
        borderBottomColor: '#E5E5E5', // Color del borde inferior
    },
    predictionText: {
        fontSize: 18, // Tamaño del texto de las predicciones
        color: '#000', // Color del texto de las predicciones
    },
});

export default Autocomplete;
