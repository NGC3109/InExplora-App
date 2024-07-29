import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { loadGeneralRequestsByGroupId } from '../../../actions/request/requestAction';

const JoinRequestList_Template = ({ navigation }) => {
  const dispatch = useDispatch();
  const generalRequests = useSelector(state => state.requestReducer.generalRequests);
  const currentUserId = useSelector(state => state.userReducer.user);
  useEffect(() => {
    if (currentUserId?.id) {
      dispatch(loadGeneralRequestsByGroupId(currentUserId.id));
    }
  }, [dispatch, currentUserId?.id]);

  const renderGridItem = useCallback(({ item }) => {
    if (!item) return null;
    
    const { userSend, group, viewed, requestDate } = item;
    const { profilePicture, displayName } = userSend || {};
    const { title } = group || {};

    const backgroundColor = viewed ? 'white' : '#e0e0e0';
    const coverImage = profilePicture || 'https://via.placeholder.com/150';

    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('request_detail', { group: item })}>
        <View style={[styles.cardContainer, { backgroundColor }]}>
          <Image source={{ uri: coverImage }} style={styles.cardImage} />
          <View style={styles.cardDetailsContainer}>
            {displayName && (
              <Text style={styles.cardTitle}>{displayName}</Text>
            )}
            {title && (
              <Text style={styles.cardSubTitle}>Quiere unirse a tu grupo <Text style={styles.groupTitle}>{title}</Text></Text>
            )}
            {requestDate && (
              <Text style={styles.cardDate}>{new Date(requestDate).toLocaleDateString()}</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [navigation]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Image source={{ uri: 'https://storage.googleapis.com/inexplora/inexplora-recursos/notifications-zero.png' }} style={styles.emptyIcon}/>
      <Text style={styles.emptyText}>No tienes ninguna solicitud pendiente</Text>
      <Text style={styles.emptySubText}>
        Aún no has recibido notificaciones de invitaciones a grupos, aceptación de solicitudes, personas que te siguen, etc.
      </Text>
    </View>
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.tabContent}>
          <FlatList
            data={generalRequests?.data || []}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  tabContent: {
    flex: 1,
  },
  groupTitle: {
    fontWeight: 'bold'
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

export default JoinRequestList_Template;
