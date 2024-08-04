import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../actions/users/userActions';
import { useNavigation } from '@react-navigation/native';

const useAuth = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await auth().signOut();
      dispatch(clearUserData()); // Limpia el estado del usuario en Redux
      navigation.navigate('MainTabs', {screen: 'Login'});
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { logout };
};

export default useAuth;
