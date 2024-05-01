import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from '../../styles/perfil';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PerfilComponent({ 
    groupsByUser,
    handleTabPress,
    createGroup,
    activeTab,
    currentUser,
    logout
}) {
  const renderGridItem = ({ item }) => (
    <View style={styles.gridItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.image} />
    </View>
  );
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
        >
            <Icon name="sign-out" size={24} color="#000" />
        </TouchableOpacity>
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

