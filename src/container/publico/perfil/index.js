import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PerfilPublico from '../../../components/publico/perfil';
import { loadGroupByUser } from '../../../actions/groups/groupAction';
import { getUserById, updateFollowersCount } from '../../../actions/users/userActions';
import useAuth from '../../../utils/hooks/useAuth';
import { useNavigation, useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import Config from 'react-native-config';

export default function PerfilPublicoContainer() {
  const socket = io(Config.SOCKET);
  const route = useRoute();
  const { userId } = route.params;
  const currentUser = useSelector(state => state.userReducer.user);
  const userPublic = useSelector(state => state.userReducer.userPublic);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser && currentUser.id && userId) {
      dispatch(loadGroupByUser(userId));
      dispatch(getUserById(userId))
      socket.emit('joinRoom', { userId: currentUser.id });
    }
    socket.on('newFollower', () => {
      dispatch(updateFollowersCount(currentUser.followersCount + 1));
    });

    return () => {
      if (currentUser && currentUser.id) {
        socket.emit('leaveRoom', { userId: currentUser.id });
      }
      socket.off('newFollower');
    };
  }, [dispatch, currentUser]);

  return (
    <PerfilPublico
        groupsByUser={groupsByUser}
        userPublic={userPublic}
        navigation={navigation}
    />
  );
}