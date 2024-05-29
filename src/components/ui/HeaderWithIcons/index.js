import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSocket } from '../../../utils/hooks/useSocket';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { IconBubbleChat, IconHeartWithoutFill, LogoInBlack } from '../../../assets/vectores';

const HeaderWithIcons = () => {
  const currentUser = useSelector(state => state.userReducer.user);
  const requestCount = useSelector(state => state.socketReducer.joinRequestCount); //contador de solicitudes de union a grupo pendientes
  const unreadMessageCount = useSelector(state => state.socketReducer.unreadMessageCount); //contador mensajes no leidos
  const generalNotificationsCount = useSelector(state => state.socketReducer.generalNotificationsCount); //contador de notificaciones
  
  const navigation = useNavigation()
  useSocket(currentUser?.id)
  return(
  <View style={styles.headerContainer}>
    <>
    <Text style={styles.headerText}>INEXPL<Text><LogoInBlack /></Text><Text>RA</Text></Text>
    </>
    
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("joinRequest")} style={styles.iconButton}>
        <Icon name="person-add-outline" size={20} color="black" />
        {requestCount > 0 && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{requestCount}</Text>
            </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => 
        navigation.navigate("notifications_detail")
      } style={styles.iconButton}>
        <IconHeartWithoutFill />
        {generalNotificationsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{generalNotificationsCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("messages")} style={styles.iconButton}>
        <IconBubbleChat />
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
    fontSize: 24,
    color: 'black',
    fontFamily: 'Roboto-Black',
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
