import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { acceptJoinRequest, loadGeneralRequestsByGroupId } from '../../../actions/groups/groupAction';

const JoinRequestList_Template = ({ navigation }) => {
  const dispatch = useDispatch();
  const generalRequests = useSelector(state => state.groupReducer.generalRequests);
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(loadGeneralRequestsByGroupId(currentUserId.id));
  }, [dispatch]);

  const goDetailsGroup = (item) => {
    navigation.navigate('detalleGrupo', { groupId: item._id })
  }
  const handleChangeStatusRequest = (idRequest) => {
    dispatch(acceptJoinRequest(idRequest))
  }
  const renderGridItem = useCallback(({ item }) => 
  {
    const backgroundColor = item.viewed ? 'white' : '#e0e0e0';
    const coverImage = item.coverImage || 'https://via.placeholder.com/150';
    return(
      <TouchableWithoutFeedback onPress={() => navigation.navigate('detalleGrupo', { groupId: item.group?._id })}>
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
  }, []);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.tabContent}>
          <FlatList
            data={generalRequests?.data}
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
