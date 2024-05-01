import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PerfilComponent from '../../components/perfil';
import { loadGroupByUser } from '../../actions/groups/groupAction';
import useAuth from '../../utils/hooks/useAuth';

export default function PerfilContainer({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentUser = useSelector(state => state.userReducer.user);
  const groupsByUser = useSelector(state => state.groupReducer.groupsByUser);
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
  const createGroup = () => {
    navigation.navigate('crearGrupo');
  };

  return (
    <PerfilComponent
        activeTab={activeTab}
        groupsByUser={groupsByUser}
        handleTabPress={handleTabPress}
        createGroup={createGroup}
        currentUser={currentUser}
        logout={logout}
    />
  );
}