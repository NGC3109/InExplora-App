import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadGroupByUser } from '../actions/groups/groupAction';

export default function MiPerfil({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(state => state.userReducer.user);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(loadGroupByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const renderGridItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.image} />
    </View>
  );

  const createGroup = () => {
    navigation.navigate('crearGrupo');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          <Image
            source={{ uri: currentUser.profilePicture || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileUserName}>{currentUser.displayName || 'Nombre de Usuario'}</Text>
            <Text style={styles.profileFollowers}>100M seguidores</Text> 
          </View>
        </View>
        <Text style={styles.profileDescription}>
          Aquí puedes agregar una descripción sobre el perfil del usuario...
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => createGroup()}>
              <Text style={styles.buttonText}>Crear Grupo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 0 && styles.activeTab]}
          onPress={() => handleTabPress(0)}
        >
          <Text style={styles.tabText}>En Progreso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 1 && styles.activeTab]}
          onPress={() => handleTabPress(1)}
        >
          <Text style={styles.tabText}>Finalizados</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContent}>
        {activeTab === 0 && (
          <FlatList
            data={groupsByUser?.data || []}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        )}
        {activeTab === 1 && <Text>Content for Item Two</Text>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Añade margen inferior para separar la descripción
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black'
  },
  profileFollowers: {
    fontSize: 14,
    textAlign: 'left',
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
  gridItem: {
    flex: 1,
    margin: 1,
  },
  image: {
    flex: 1,
    height: 150, // Ajusta la altura según tus necesidades
    resizeMode: 'cover',
  },
  profileDescription: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});
