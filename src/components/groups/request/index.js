import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { acceptJoinRequest, loadJoinRequestsByGroupId } from '../../../actions/groups/groupAction';
import { SuperManIcon } from '../../../assets/vectores';

const JoinRequestList_Template = ({ navigation }) => {
  const dispatch = useDispatch();
  const joinRequest = useSelector(state => state.groupReducer.joinRequests);
  console.log('joinRequest: ', joinRequest)
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(loadJoinRequestsByGroupId(currentUserId.id));
  }, [dispatch]);

  const goDetailsGroup = (item) => {
    navigation.navigate('detalleGrupo', { groupId: item._id })
  }
  const handleChangeStatusRequest = (idRequest) => {
    dispatch(acceptJoinRequest(idRequest))
  }
  const renderGridItem = useCallback(({ item }) => (
    <TouchableWithoutFeedback onPress={() => goDetailsGroup(item)}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.profilePicture || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardTitle}>{item.displayName}</Text>
          <Text style={styles.cardSubTitle}>{item.message}</Text>
          <Text style={styles.cardDate}>{new Date(item.requestDate).toLocaleDateString()}</Text>
          <Text><SuperManIcon /> Cocinero</Text>
          <TouchableWithoutFeedback onPress={() => handleChangeStatusRequest(item.id)}>
            <Text>Aceptar</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ), []);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.tabContent}>
          <FlatList
            data={joinRequest?.data}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
});
export default JoinRequestList_Template;
