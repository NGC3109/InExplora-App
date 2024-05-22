import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { bookmark, removeBookmark } from '../actions/bookmark/bookmarkAction';

const socket = io(Config.SOCKET);

const DetailGroup = ({ navigation, route }) => {
  const { 
    groupItem, 
    likedByUser, 
    userId, 
    likeId, 
    bookmarked,
    bookmark_id
  } = route.params;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(likedByUser);
  const [bookmarkId, setBookmarkId] = useState(bookmark_id)
  const [bookmarkedByUser, setBookmarkedByUser] = useState(bookmarked)
  const currentBookmarks = useSelector(state => state.bookmarkReducer.bookmarks);

  const handleJoinGroup = () => {
    navigation.navigate('join_step1', { groupId: groupItem._id })
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleLike = () => {
    socket.emit('likeGroup', { userId, groupId: groupItem._id });
    setLikes(true)
  };

  const handleDislike = () => {
      socket.emit('dislikeGroup', { likeId, groupId: groupItem._id });
      setLikes(false)
  };
  

  const handleBookmark = (userId, bookmarkableId, onModel, setBookmarkedByUser) => {
      dispatch(bookmark(userId, bookmarkableId, onModel))
      setBookmarkedByUser(true)
  }

  const handleDeleteBookmark = (bookmarkId, setBookmarkedByUser, setBookmarkId) => {
      dispatch(removeBookmark(bookmarkId))
      setBookmarkedByUser(false)
      setBookmarkId(currentBookmarks._id)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: groupItem?.profilePicture || 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg' }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
            <IonIcon name="close-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          {
            likes ? 
              <TouchableOpacity style={styles.disLikedIcon} onPress={handleDislike}>
                <IonIcon name="heart-sharp" size={20} color="#EF312E" />
              </TouchableOpacity> 
            : 
              <TouchableOpacity style={styles.likedIcon} onPress={handleLike}>
                <IonIcon name="heart-outline" size={20} color="#000" />
              </TouchableOpacity>
          }
          
        </View>
        <View style={styles.content}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => handleJoinGroup()}>
                <Text style={styles.bannerText}>Solicitar unirme al grupo</Text>
            </TouchableWithoutFeedback>
            {bookmarkedByUser ? 
              <TouchableOpacity onPress={() => handleDeleteBookmark(bookmarkId, setBookmarkedByUser, setBookmarkId)}>
                <IonIcon name="bookmark" size={24} color="#3d444d" style={styles.moreIcon} />
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={() => handleBookmark(userId, groupItem._id, 'Group', setBookmarkedByUser)}>
                <IonIcon name="bookmark-outline" size={24} color="#3d444d" style={styles.moreIcon} />
              </TouchableOpacity>
            }
          </View>
          <Text style={styles.title}>{groupItem?.title}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Indoor</Text>
            <Text style={styles.tag}>Pet friendly</Text>
            <Text style={styles.tag}>Papaveraceae</Text>
          </View>
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.description}>
            {groupItem?.description}
          </Text>
          {/* Aquí agregarías el resto de los elementos como 'Height', 'Water', etc. */}
          <View style={styles.infoContainer}>
            <View style={styles.infoBlock}>
                <View style={styles.infoItem}>
                <Icon name="ruler-vertical" size={20} color="#6A994E" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Height</Text>
                    <Text style={styles.infoText}>Small</Text>
                </View>
                </View>
                <View style={styles.infoItem}>
                <Icon name="tint" size={20} color="#2C7DA0" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Water</Text>
                    <Text style={styles.infoText}>333ml</Text>
                </View>
                </View>
            </View>
            <View style={styles.infoBlock}>
                <View style={styles.infoItem}>
                <Icon name="sun" size={20} color="#F2CC8F" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Light</Text>
                    <Text style={styles.infoText}>Normal</Text>
                </View>
                </View>
                <View style={styles.infoItem}>
                <Icon name="thermometer-half" size={20} color="#A44A3F" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Humidity</Text>
                    <Text style={styles.infoText}>56%</Text>
                </View>
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save this plant</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20, // Este margen es para que el contenido no se superponga en la imagen
  },
  image: {
    width: '100%',
    height: 330,
  },
  overlay: {
    backgroundColor: 'white'
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  likedIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    padding: 5,
    backgroundColor: 'white'
  },
  disLikedIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    padding: 5,
    backgroundColor: 'white'
  },
  bannerText: {
    backgroundColor: '#00A676',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    fontSize: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#E8E8E8',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoBlock: {
    flexDirection: 'column',
    width: '50%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContent: {
    marginLeft: 10, // Espacio entre el icono y el texto
    alignItems: 'flex-start',
  },
  infoTitle: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#5CAD40',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    // Agrega sombra al botón
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // ... añade aquí más estilos para otros elementos ...
});

export default DetailGroup;
