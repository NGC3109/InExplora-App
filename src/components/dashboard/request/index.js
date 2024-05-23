import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { useSelector, useDispatch } from 'react-redux';
import { loadGeneralRequestsByGroupId } from '../../../actions/request/requestAction';

const JoinRequestList_Template = ({ navigation }) => {
  const dispatch = useDispatch();
  const generalRequests = useSelector(state => state.requestReducer.generalRequests);
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(loadGeneralRequestsByGroupId(currentUserId.id));
  }, [dispatch]);

  const renderGridItem = useCallback(({ item }) => 
  {
    const backgroundColor = item.viewed ? 'white' : '#e0e0e0';
    const coverImage = item.user.profilePicture || 'https://via.placeholder.com/150';
    return(
      <TouchableWithoutFeedback onPress={() => navigation.navigate('request_detail', { group: item })}>
          <View style={[styles.cardContainer, { backgroundColor }]}>
            <Image source={{ uri: coverImage }} style={styles.cardImage} />
            <View style={styles.cardDetailsContainer}>
              {item.user.displayName && (
                <Text style={styles.cardTitle}>{item.user.displayName}</Text>
              )}
              <Text style={styles.cardSubTitle}>Quiere unirse a tu grupo <Text style={styles.groupTitle}>{item.group.title}</Text></Text>
              <Text style={styles.cardDate}>{new Date(item.requestDate).toLocaleDateString()}</Text>
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
});
export default JoinRequestList_Template;
