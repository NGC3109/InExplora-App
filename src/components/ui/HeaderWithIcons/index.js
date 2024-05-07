import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSocket } from '../../../utils/hooks/useSocket';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const HeaderWithIcons = () => {
  const currentUser = useSelector(state => state.userReducer.user);
  const requestCount = useSelector(state => state.socketReducer.joinRequestCount);
  const unreadMessageCount = useSelector(state => state.socketReducer.unreadMessageCount);
  const generalRequestCount = useSelector(state => state.socketReducer.generalRequestCount);
  
  const navigation = useNavigation()
  useSocket(currentUser.id)
  return(
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>InExplora</Text>
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("messages")} style={styles.iconButton}>
        <Icon name="user-plus" size={24} />
        {generalRequestCount > 0 && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{generalRequestCount}</Text>
            </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("joinRequest")} style={styles.iconButton}>
        <Icon name="bell-o" size={24} />
        {requestCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{requestCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("messages")} style={styles.iconButton}>
        <Icon name="inbox" size={24} />
        {unreadMessageCount > 0 && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadMessageCount}</Text>
            </View>
        )}
      </TouchableOpacity>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto asegura que el texto y los iconos estén en lados opuestos.
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    // Asegúrate de que el texto no se estire para ocupar espacio innecesario.
    flexShrink: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    // Esto empujará los iconos a la derecha.
    justifyContent: 'flex-end',
  },
  iconButton: {
    // Asegúrate de que el espacio solo esté a la derecha del icono para mantenerlos juntos.
    marginLeft: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6, // Ajusta la posición de la insignia según sea necesario.
    top: -3,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HeaderWithIcons;
