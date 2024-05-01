import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { clearUserData, getUser } from '../../actions/users/userActions';

const useAuth = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch(getUser(user.email));
    }
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const logout = async () => {
    try {
      await auth().signOut();
      dispatch(clearUserData()); // Limpia el estado del usuario en Redux
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, initializing, logout };
};

export default useAuth;
