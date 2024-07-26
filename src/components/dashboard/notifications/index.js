import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet, SafeAreaView } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { loadGeneralNotificationsByGroupId } from '../../../actions/notifications/notificationsAction';

const NotificationsList_Template = ({ navigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notificationsReducer.notifications);
  const currentUserId = useSelector(state => state.userReducer.user);
  const socket = useSelector(state => state.initSocketReducer.socket);

  useEffect(() => {
    dispatch(loadGeneralNotificationsByGroupId(currentUserId.id));
  }, [dispatch, currentUserId.id]);

  const handleNotificationPress = useCallback((notificationId, groupId, viewed) => {
    if (!viewed) {
      socket.emit('notificationViewed', { userId: currentUserId.id, notificationId });
    }
    navigation.navigate('detalleGrupo', { groupId });
  }, [currentUserId.id, navigation, socket]);

  const renderGridItem = useCallback(({ item }) => {
    const backgroundColor = item.viewed ? 'white' : '#e0e0e0';
    const coverImage = item.coverImage || 'https://via.placeholder.com/150';
    return (
      <TouchableWithoutFeedback onPress={() => handleNotificationPress(item._id, item.group._id, item.viewed)}>
        <View style={[styles.cardContainer, { backgroundColor }]}>
          <Image source={{ uri: coverImage }} style={styles.cardImage} />
          <View style={styles.cardDetailsContainer}>
            {item.associatedName && (
              <Text style={styles.cardTitle}>{item.associatedName}</Text>
            )}
            <Text style={styles.cardSubTitle}>{item.message}</Text>
            <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }, [handleNotificationPress]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image source={{ uri: 'https://storage.googleapis.com/inexplora/inexplora-recursos/notifications-zero.png' }} style={styles.emptyIcon}/>
      <Text style={styles.emptyText}>No tienes ninguna notificación</Text>
      <Text style={styles.emptySubText}>
        Aún no has recibido notificaciones de invitaciones a grupos, aceptación de solicitudes, personas que te siguen, etc.
      </Text>
    </View>
  );

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.tabContent}>
            <FlatList
              data={notifications?.data}
              renderItem={renderGridItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyComponent}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardDetailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubTitle: {
    fontSize: 14,
    color: 'grey',
  },
  cardDate: {
    fontSize: 12,
    color: 'grey',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain', // Asegúrate de que la imagen se muestre correctamente
  },
  emptyText: {
    fontSize: 18,
    color: '#001422',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 16,
    color: '#001422',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NotificationsList_Template;
