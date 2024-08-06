import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearSearchResults } from '../../../actions/search/searchActions';
import debounce from 'lodash/debounce';

const SearchHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.searchReducer.results) || [];
    const [query, setQuery] = useState('');
    const currentUserId = useSelector(state => state.userReducer.user);

    const handleSearch = useCallback(debounce((query) => {
        if (query.trim()) {
            dispatch(search(query));
        } else {
            dispatch(clearSearchResults());
        }
    }, 500), []);

    const onChangeSearch = (text) => {
        setQuery(text);
        handleSearch(text);
    };

    const handleNavigation = (item) => {
        if (item.type === 'Grupo') {
            navigation.navigate('detalleGrupo', { groupId: item.id });
        } else if (item.type === 'Usuario') {
            if (item.id === currentUserId?.id) {
                navigation.navigate('MainTabs', { screen: 'MiPerfil' });
            } else {
                navigation.navigate('profile_public', { userId: item.id });
            }
        } else if (item.type === 'Destino') {
            navigation.navigate('detail_destiny', { destinyId: item.id });
        }
    };

    const handleBackPress = () => {
        dispatch(clearSearchResults());
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Icon name="arrow-back" size={24} color="#888" />
                </TouchableOpacity>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Buscar"
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={onChangeSearch}
                />
                <TouchableOpacity style={styles.buttonClear} onPress={() => setQuery('')}>
                    <Icon name="close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            {results.length === 0 && query ? (
                <Text style={styles.noResultsText}>No hay resultados para su búsqueda</Text>
            ) : (
                <FlatList 
                    data={results}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.groupContainer} onPress={() => handleNavigation(item)}>
                            <Image source={{ uri: item.url || 'https://storage.googleapis.com/inexplora/inexplora-recursos/placeholder-img.png' }} style={styles.groupImage} />
                            <View style={styles.textContainer}>
                                <Text style={styles.groupName}>{item.displayName}</Text>
                                <Text style={styles.groupTag}>{item.type}</Text>
                            </View>
                            <Icon name="arrow-forward" size={24} color="#888" />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
    buttonClear: {
        backgroundColor: '#888',
        padding: 2,
        borderRadius: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        marginHorizontal: 10,
        color: '#888',
    },
    noResultsText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
        fontSize: 16,
    },
    groupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c3c3c3',
    },
    groupImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    groupName: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    groupTag: {
        color: '#888',
        fontSize: 12,
    },
});

export default SearchHome;
