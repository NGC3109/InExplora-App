import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PerfilComponent from '../../components/perfil';
import { loadGroupByUser } from '../../actions/groups/groupAction';
import useAuth from '../../utils/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function PerfilContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(state => state.userReducer.user);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
  const navigation = useNavigation()

  const dispatch = useDispatch();
  const { logout } = useAuth();
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(loadGroupByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const updateUser = () => {
    navigation.navigate('update_user');
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
    />
  );
}