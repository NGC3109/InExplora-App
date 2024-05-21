import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupItem = ({ item, userId, socket, onShowComments }) => {
  const [likes, setLikes] = useState(item.totalLikes);
  const [likedByUser, setLikedByUser] = useState(item.likedByUser);
  const [likeId, setLikeId] = useState(item.likeId);
  const [comments, setComments] = useState(item.totalComments || 0);

  useEffect(() => {
    const handleNewLike = ({ groupId, like, totalLikes }) => {
      if (groupId === item._id) {
        setLikes(totalLikes);
        if (!likedByUser && like.user === userId) {
          setLikedByUser(true);
          setLikeId(like._id);
        }
      }
    };

    const handleRemoveLike = ({ groupId, likeId: removedLikeId, totalLikes }) => {
      if (groupId === item._id) {
        setLikes(totalLikes);
        if (likedByUser && removedLikeId === likeId) {
          setLikedByUser(false);
          setLikeId(null);
        }
      }
    };

    const handleNewComment = ({ groupId, totalComments }) => {
      if (groupId === item._id) {
        setComments(totalComments);
      }
    };

    const handleRemoveComment = ({ groupId, totalComments }) => {
      if (groupId === item._id) {
        setComments(totalComments);
      }
    };

    socket.on('newLike', handleNewLike);
    socket.on('newDislike', handleRemoveLike);
    socket.on('newComment', handleNewComment);
    socket.on('commentRemoved', handleRemoveComment);

    return () => {
      socket.off('newLike', handleNewLike);
      socket.off('newDislike', handleRemoveLike);
      socket.off('newComment', handleNewComment);
      socket.off('commentRemoved', handleRemoveComment);
    };
  }, [item._id, likedByUser, userId, likeId]);

  const handleLike = () => {
    socket.emit('likeGroup', { userId, groupId: item._id });
  };

  const handleDislike = () => {
    socket.emit('dislikeGroup', { likeId, groupId: item._id });
  };

  const formatAmount = (amount) => {
    const numericAmount = parseInt(amount.replace(/\./g, ''), 10);
    if (numericAmount >= 1000000) {
      return `${(numericAmount / 1000000).toFixed(0)} Millon`;
    }
    return amount;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: item.creatorProfilePicture }} 
          style={styles.profileImage} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.userName}>{item.creatorName}</Text>
          <Text style={styles.userArticles}>21 días</Text>
        </View>
        <Icon name="bookmark-outline" size={24} color="#3d444d" style={styles.moreIcon} />
      </View>
      
      <Image 
        source={{ uri: item.profilePicture }} 
        style={styles.articleImage} 
      />
      
      <Text style={styles.articleTitle}>
        {item.title}
      </Text>
      
      <Text>
        Saliendo desde {item.startingPlace.startingTravel}
      </Text>

      <View style={styles.footer}>
        <View style={styles.footerIcon}>
          {likedByUser ? (
            <TouchableOpacity onPress={handleDislike}>
              <Icon name="heart-sharp" size={24} color="#EF312E" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike}>
              <Icon name="heart-outline" size={24} color="#3d444d" />
            </TouchableOpacity>
          )}
          <Text style={styles.footerText}>{likes}</Text>
        </View>
        <View style={styles.footerIcon}>
          <TouchableOpacity onPress={() => onShowComments(item._id)}>
            <Icon name="chatbox-outline" size={24} color="#3d444d" />
          </TouchableOpacity>
          <Text style={styles.footerText}>{comments}</Text>
        </View>
        <View style={styles.footerIcon}>
          <Icon name="people-outline" size={24} color="#3d444d" />
          <Text style={styles.footerText}>{item.numberOfPeople}</Text>
        </View>
        <View style={styles.footerIcon}>
          <Icon name="cash-outline" size={24} color="#3d444d" />
          <Text style={styles.footerText}>{formatAmount(item.budget)}</Text>
        </View>
        <View style={styles.footerIcon}>
          {item.genre == "Solo mujeres" && <Icon name="woman-outline" size={24} color="#3d444d" />}
          {item.genre == "Solo hombres" && <Icon name="man-outline" size={24} color="#3d444d" />}
          {item.genre == "Mixto" && <><Icon name="woman-outline" size={24} color="#3d444d" style={{marginRight: -10}} /><Icon name="man-outline" size={24} color="#3d444d" /></>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3d444d',
  },
  userArticles: {
    color: '#7d7d7d',
  },
  moreIcon: {
    paddingLeft: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3d444d',
    marginTop: 10,
  },
  articleTime: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#7d7d7d',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 5,
    color: '#7d7d7d',
  },
});

export default GroupItem;