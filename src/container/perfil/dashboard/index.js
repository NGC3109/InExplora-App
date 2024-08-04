import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconIcon from 'react-native-vector-icons/Octicons';
import CirclePerfil from '../../../assets/vectores/CirclePerfil';
import { calculateProfileCompletion, getAge } from '../../../utils/functions';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function DashboardProfile() {
  const navigation = useNavigation()
  const currentUser = useSelector(state => state.userReducer.user);
  const progress = calculateProfileCompletion(currentUser);
  const age = currentUser ? getAge(currentUser?.birthday) : 0;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <CirclePerfil progress={progress} profilePicture={currentUser && currentUser?.profilePicture} />
        <Text style={styles.profileName}>
          {currentUser && currentUser?.displayName}, {age || 0} <Icon name="checkmark-circle" size={20} color="#4CAF50" />
        </Text>
      </View>
      
      <View style={styles.iconContainerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('dashboard_settings')}>
          <View style={styles.iconCircle}>
            <IconIcon name="gear" size={30} color="#000" />
          </View>
          <Text style={styles.iconLabel}>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('updateProfile')}>
          <View style={styles.iconCircle}>
            <IconIcon name="pencil" size={30} color="#000" />
          </View>
          <Text style={styles.iconLabel}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.iconCircle}>
            <Icon name="camera-outline" size={30} color="#000" />
            <View style={styles.addMediaBadge}>
              <Icon name="add" size={10} color="#fff" />
            </View>
          </View>
          <Text style={styles.iconLabel}>Agregar fotos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    marginTop: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black'
  },
  addMediaBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FF3E3E',
    borderRadius: 10,
    padding: 2,
  },
  iconLabel: {
    color: '#000',
    marginTop: 5,
  },
});

export default DashboardProfile;
