import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PerfilPublico from '../../../components/publico/perfil';
import { loadGroupByUser } from '../../../actions/groups/groupAction';
import { getUserById, updateFollowersCount } from '../../../actions/userPublic/userPublicAction';
import { useNavigation, useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import Config from 'react-native-config';

export default function PerfilPublicoContainer() {
  const socket = io(Config.SOCKET);
  const route = useRoute();
  const { userId } = route.params;
  const currentUser = useSelector(state => state.userReducer.user);
  const userPublic = useSelector(state => state.userPublicReducer.userPublic);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  console.log('userPublic: ', userPublic)
  useEffect(() => {
    if (currentUser && currentUser?.id && userId) {
      dispatch(loadGroupByUser(userId));
      dispatch(getUserById(userId, currentUser?.id));
      socket.emit('joinRoom', { userId: currentUser?.id });
    }

    socket.on('newFollower', ({ followerId }) => {
      console.log('newFollower: ', followerId)
      if (followerId === currentUser?.id) {
        setIsFollowing(true);
      }
      dispatch(updateFollowersCount(currentUser?.followersCount + 1));
    });

    socket.on('lostFollower', ({ followerId }) => {
      console.log('lostFollower: ', followerId)
      if (followerId === currentUser?.id) {
        setIsFollowing(false);
      }
      dispatch(updateFollowersCount(currentUser?.followersCount - 1));
    });

    return () => {
      if (currentUser && currentUser?.id) {
        socket.emit('leaveRoom', { userId: currentUser?.id });
      }
      socket.off('newFollower');
      socket.off('lostFollower');
    };
  }, [dispatch, currentUser, userId]);

  const handleFollow = () => {
    if (currentUser && userId) {
      socket.emit('followUser', { followerId: currentUser.id, followingId: userId });
    }
  };

  const handleUnfollow = () => {
    if (currentUser && userId) {
      socket.emit('unfollowUser', { followerId: currentUser?.id, followingId: userId });
    }
  };

  return (
    <PerfilPublico
      groupsByUser={groupsByUser}
      userPublic={userPublic?.data}
      navigation={navigation}
      onFollow={handleFollow}
      onUnfollow={handleUnfollow}
    />
  );
}
