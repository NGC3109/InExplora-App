import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../../styles/groups/group_item';
import { formatToThousands } from '../../../utils/functions';

const GroupItem = ({ 
  item, 
  userId, 
  socket, 
  onShowComments, 
  handleBookmark,
  handleDeleteBookmark,
  navigation,
}) => {
  const [likes, setLikes] = useState(item.totalLikes);
  const [bookmarkedByUser, setBookmarkedByUser] = useState(item.bookmarkedByUser)
  const [bookmarkId, setBookmarkId] = useState(item.bookmarkId)
  const [likedByUser, setLikedByUser] = useState(item.likedByUser);
  const [likeId, setLikeId] = useState(item.likeId);
  const [comments, setComments] = useState(item.totalComments || 0);

  const startingTravelText = item?.startingPlace?.startingTravel.split('-')[0];

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

    const handleNewComment = ({ commentableId, totalComments }) => {
      if (commentableId === item._id) {
        setComments(totalComments);
      }
    };

    const handleRemoveComment = ({ commentableId, totalComments }) => {
      if (commentableId === item._id) {
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
    socket.emit('likeGroup', { userId, likeableId: item._id, onModel: 'Group'});
  };

  const handleDislike = () => {
      socket.emit('dislikeGroup', { likeId, likeableId: item._id, onModel: 'Group' });
  };
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
        const millions = amount / 1000000;
        return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} Millon`;
    }
    return formatToThousands(amount).toString();
  };

  const goDetailsGroup = (item) => {
    navigation.navigate('detalleGrupo', { 
      groupId: item._id,
    })
  }

  const goProfileUser = (userPublic) => {
    if(userPublic === userId){
      navigation.navigate('MainTabs', {
        screen: 'MiPerfil'
      });
    }else{
      navigation.navigate('profile_public', { userId: userPublic })
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => goDetailsGroup(item)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.creatorProfilePicture }} 
            style={styles.profileImage} 
          />
          <View style={styles.headerTextContainer}>
            <TouchableOpacity onPress={() => goProfileUser(item.userCreator)}>
              <Text style={styles.userName}>{item.creatorName}</Text>
            </TouchableOpacity>
            <Text style={styles.userArticles}>{item.numberOfDays || 0} días</Text>
          </View>
          {bookmarkedByUser ? 
            <TouchableOpacity onPress={() => handleDeleteBookmark(bookmarkId, setBookmarkedByUser, setBookmarkId)}>
              <Icon name="bookmark" size={24} color="#3d444d" style={styles.moreIcon} />
            </TouchableOpacity>
          :
              <TouchableOpacity onPress={() => handleBookmark(userId, item._id, 'Group', setBookmarkedByUser)}>
                <Icon name="bookmark-outline" size={24} color="#3d444d" style={styles.moreIcon} />
              </TouchableOpacity>
          }
        </View>
        <Image 
          source={{ uri: item.profilePicture }} 
          style={styles.articleImage} 
        />
        <Text style={styles.articleTitle}>
          {item.title}
        </Text>
        <Text>
          Saliendo desde {startingTravelText}
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
            {item.genre == "Solo mujeres" && <Icon name="female-sharp" size={24} color="#3d444d" />}
            {item.genre == "Solo hombres" && <Icon name="male-sharp" size={24} color="#3d444d" />}
            {item.genre == "Hombres y mujeres" && <Icon name="male-female-sharp" size={24} color="#3d444d" />}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default GroupItem;
