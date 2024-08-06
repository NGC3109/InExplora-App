import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageGallery from '../../../components/ui/ImageGallery';
import SkeletonLoader from '../../../components/ui/SkeletonLoader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchDestinyById } from '../../../actions/destinations/destinationsActions';
import { IconLeaf, LeafSeparator } from '../../../assets/vectores';

const DetailDestiny = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destinyId } = route.params;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.userReducer.user);
  const socket = useSelector(state => state.initSocketReducer.socket);

  const { destiny, loading, error } = useSelector(state => state.destinationsReducer);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [totalComments, setTotalComments] = useState(0);
  
  useEffect(() => {
    dispatch(fetchDestinyById(destinyId));
    socket.emit('fetchComments', { commentableId: destinyId, onModel: 'Destiny', limit: 3 });
    socket.emit('joinComment', { userId: currentUser.id, commentableId: destinyId });

    const handleCommentsFetched = ({ success, comments, totalComments }) => {
      if (success) {
        const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedComments);
        setTotalComments(totalComments);
      }
    };

    const handleNewComment = ({ commentableId, comment, totalComments }) => {
      if (commentableId === destinyId) {
        setComments(prevComments => {
          const updatedComments = [comment, ...prevComments];
          if (updatedComments.length > 3) {
            updatedComments.pop();
          }
          return updatedComments;
        });
        setTotalComments(totalComments);
      }
    };

    socket.on('commentsFetched', handleCommentsFetched);
    socket.on('newComment', handleNewComment);

    return () => {
      socket.off('commentsFetched', handleCommentsFetched);
      socket.off('newComment', handleNewComment);
    };
  }, [dispatch, destinyId]);

  const handleComment = () => {
    if (newComment.trim()) {
      socket.emit('addComment', { userId: currentUser.id, commentableId: destinyId, onModel: 'Destiny', text: newComment });
      setNewComment('');
    }
  };

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <SkeletonLoader width="100%" height={350} style={styles.skeleton} />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={[styles.section, styles.sectionProfile]}>
            <SkeletonLoader width={200} height={30} style={[styles.skeleton, { marginBottom: 5 }]} />
            <SkeletonLoader width={150} height={20} style={styles.skeleton} />
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <SkeletonLoader width="90%" height={80} style={styles.skeleton} />
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <SkeletonLoader width="90%" height={80} style={styles.skeleton} />
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <SkeletonLoader width="90%" height={80} style={styles.skeleton} />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!destiny) {
    return null; // Or some placeholder UI while the destiny is being fetched
  }

  const images = [destiny.url, destiny.galeria?.url_1, destiny.galeria?.url_2, destiny.galeria?.url_3].filter(url => url && url.trim() !== '');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {images.length > 0 ? 
          <ImageGallery images={images} /> 
        : 
          <Image source={{ uri: 'https://storage.googleapis.com/inexplora/inexplora-recursos/placeholder-img.png' }} style={styles.imagePlaceholder} />
        }
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileDetails}>
        <View style={[styles.section, styles.sectionProfile]}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>{destiny?.nombre}</Text>
            <Text style={styles.followButtonText}><IconLeaf /></Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <Icon name="location" size={18} color="grey" />
            <Text style={styles.profileInfo}>{destiny?.region}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          {destiny?.descripcion ? (
            <Text style={styles.profileInfo}>{destiny.descripcion}</Text>
          ) : (
            <Text style={styles.noInfoText}>No hay información disponible.</Text>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendaciones</Text>
          {destiny?.recomendaciones ? (
            <Text style={styles.profileInfo}>{destiny.recomendaciones}</Text>
          ) : (
            <Text style={styles.noInfoText}>No hay información disponible.</Text>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accesos</Text>
          {destiny?.acceso ? (
            <Text style={styles.profileInfo}>{destiny.acceso}</Text>
          ) : (
            <Text style={styles.noInfoText}>No hay información disponible.</Text>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deja un comentario</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <Button title="Comentar" onPress={handleComment} />
        </View>
        <View style={styles.separator} />
        <View style={styles.section}>
          <View style={styles.referencesHeader}>
            <Text style={styles.sectionTitle}>Comentarios</Text>
            <TouchableOpacity onPress={() => {
              if (totalComments > 0) {
                navigation.navigate('comments', { destinyId: destinyId });
              }
            }}>
              <Text style={styles.viewAll}>Ver todo ({totalComments})</Text>
            </TouchableOpacity>
          </View>
          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>Nadie ha comentado aún. ¡Sé el primero en comentar!</Text>
          ) : (
            comments.slice(0, 3).map(comment => (
              <View key={comment._id}>
                <View style={styles.reference}>
                  <Image
                    style={styles.referenceImage}
                    source={{ uri: comment.user.profilePicture || 'https://via.placeholder.com/50' }}
                  />
                  <View style={styles.referenceContent}>
                    <Text style={styles.referenceName}>{comment.user.displayName}</Text>
                    <Text style={styles.referenceDate}>{new Date(comment.createdAt).toLocaleDateString()}</Text>
                    <Text style={styles.referenceText}>{comment.text}</Text>
                  </View>
                </View>
                <View style={styles.referenceSeparator}>
                  <LeafSeparator />
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  imagePlaceholder: {
      width: '100%',
      height: 400,
      resizeMode: 'cover',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 350,
  },
  iconsVerify: {
    marginRight: 4,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileDetails: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: -10, // Ajusta este valor para que el perfil toque la imagen
  },
  sectionProfile: {
    marginTop: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    color: '#021121',
    fontSize: 28, // Tamaño de fuente ajustado
    fontWeight: 'bold',
    marginBottom: 8,
    width: '80%',
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
  },
  followInfoContainer: {
    marginBottom: 8,
  },
  followInfo: {
    color: 'gray',
    fontSize: 18,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileInfo: {
    color: 'gray',
    fontSize: 18, // Tamaño de fuente ajustado
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#021121',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noInfoText: {
    color: 'gray',
    fontSize: 18,
    fontStyle: 'italic',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sectionContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021121',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  sectionItemText: {
    color: 'white',
    marginLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
  },
  referencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    color: '#3498db',
    fontSize: 16,
  },
  reference: {
    flexDirection: 'row',
  },
  referenceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  referenceContent: {
    flex: 1,
  },
  referenceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#021121',
  },
  referenceDate: {
    color: 'gray',
    marginBottom: 5,
  },
  referenceText: {
    color: '#021121',
    marginBottom: 10,
  },
  referenceSeparator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  noCommentsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    paddingBottom: 20
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default DetailDestiny;
