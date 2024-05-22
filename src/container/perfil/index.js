import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PerfilComponent from '../../components/perfil';
import { loadGroupByUser } from '../../actions/groups/groupAction';
import { updateFollowersCount } from '../../actions/users/userActions';
import useAuth from '../../utils/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { Share } from 'react-native';
import io from 'socket.io-client';
import Config from 'react-native-config';

export default function PerfilContainer() {
  const socket = io(Config.SOCKET);
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(state => state.userReducer.user);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
  const navigation = useNavigation()

  const dispatch = useDispatch();
  const { logout } = useAuth();
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(loadGroupByUser(currentUser.id));
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

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const updateUser = () => {
    navigation.navigate('update_user');
  };

  const onShare = async () => {
    try {
        const result = await Share.share({
            message: `Hola, échale un vistazo a mi perfil en InExplora!`,
            url: 'https://tuapp.com/perfil',
            title: 'Mira mi perfil en InExplora'
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('Shared with activity type: ' + result.activityType);
            } else {
                console.log('Shared');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Dismissed');
        }
    } catch (error) {
        console.error('Error while sharing: ', error);
    }
};

  return (
    <PerfilComponent
        activeTab={activeTab}
        groupsByUser={groupsByUser}
        handleTabPress={handleTabPress}
        updateUser={updateUser}
        currentUser={currentUser}
        logout={logout}
        navigation={navigation}
        onShare={onShare}
    />
  );
}