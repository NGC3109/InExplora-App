import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDate } from '../../../utils/functions';

const CommentSection = ({ groupId, socket, onClose, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [animation] = useState(new Animated.Value(0));
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    socket.emit('fetchComments', { commentableId: groupId, onModel: 'Group' });

    const handleCommentsFetched = ({ success, comments }) => {
      if (success) {
        setComments(comments);
      }
    };

    const handleNewComment = ({ commentableId, comment, totalComments }) => {
      if (commentableId === groupId) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    };

    socket.on('commentsFetched', handleCommentsFetched);
    socket.on('newComment', handleNewComment);

    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      socket.off('commentsFetched', handleCommentsFetched);
      socket.off('newComment', handleNewComment);
    };
  }, [groupId, socket]);

  const handleLikeComment = (commentId) => {
    // Implementa la lógica para dar like a un comentario
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      socket.emit('addComment', { userId: currentUserId, commentableId: groupId, onModel: 'Group', text: newComment });
      setNewComment('');
    }
  };

  const renderComment = ({ item }) => {
      return(
        <View style={styles.commentContainer}>
          <Image source={{ uri: item.user.profilePicture }} style={styles.avatar} />
          <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUser}>{item.user.displayName}</Text>
              <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
          <View style={styles.likeContainer}>
            <TouchableOpacity onPress={() => handleLikeComment(item._id)}>
              <Icon name="heart-outline" size={20} color="#3d444d" />
            </TouchableOpacity>
            <Text style={styles.likeCount}>{item.likes || ''}</Text>
          </View>
        </View>
  )}

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comentarios</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderComment}
      />
      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.newCommentInput}
          placeholder="Agrega un comentario..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Icon name="send" size={24} color="#3d444d" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    marginLeft: 10,
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentDate: {
    fontSize: 14,
    color: '#777',
    marginLeft: 10
  },
  commentText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  likeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  likeCount: {
    fontSize: 14,
    color: '#777',
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  newCommentInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
});

export default CommentSection;
