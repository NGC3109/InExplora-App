import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { LeafSeparator } from '../../../assets/vectores';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Comments = () => {  
  const socket = useSelector(state => state.initSocketReducer.socket);
  const route = useRoute();
  const { destinyId } = route.params;
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    socket.emit('fetchComments', { commentableId: destinyId, onModel: 'Destiny' });

    const handleCommentsFetched = ({ success, comments }) => {
      if (success) {
        const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedComments);
      }
    };

    socket.on('commentsFetched', handleCommentsFetched);

    return () => {
      socket.off('commentsFetched', handleCommentsFetched);
    };
  }, [destinyId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileDetails}>
        <View style={styles.section}>
          {comments.length === 0 ? (
            <View style={styles.noCommentsContainer}>
              <Text style={styles.noCommentsText}>Nadie ha comentado aún. ¡Sé el primero en comentar!</Text>
            </View>
          ) : (
            comments.map(comment => (
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileDetails: {
    backgroundColor: 'white',
    width: '100%',
  },
  section: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
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
  noCommentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noCommentsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default Comments;
