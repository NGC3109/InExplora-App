import axios from 'axios';
import Config from 'react-native-config';
import { 
  PREPARE_TO_CREATE, 
  SAVE_USER, 
  DISPLAYNAME_TO_CREATE, 
  GET_USER, 
  CLEAR_USER, 
  UPDATE_FOLLOWERS_COUNT,
} from '../../utils/constants';

export const clearUserData = () => {
  return {
    type: CLEAR_USER
  };
};

export const updateFollowersCount = (newCount) => ({
  type: UPDATE_FOLLOWERS_COUNT,
  payload: newCount,
});

export const saveUser = (userData) => {
  return async (dispatch) => {
    try {
      // URL de tu API para crear usuarios
      const apiUrl = `${Config.API_ENDPOINT}users/`;
      // Enviar la solicitud al backend para crear el usuario
      const { data } = await axios.post(apiUrl, userData);
      // Verificar la respuesta del backend
      if (data) {
        // Usuario creado exitosamente, guardar en el store
        dispatch({
          type: SAVE_USER,
          payload: data,
        });
      } else {
        // Manejar respuesta no exitosa, según sea necesario
        console.error('Error en la creación del usuario en el backend');
      }
    } catch (error) {
      // Manejar errores de conexión o del servidor
      console.error('Error al crear el usuario en el backend:', error);
    }
  };
};
export const getUser = (email) => {
  return async (dispatch) => {
    try {
      const apiUrl = `${Config.API_ENDPOINT}users/${email}`;
      const response = await axios.get(apiUrl);
      const data = response.data;
      if (data) {
        dispatch({
          type: GET_USER,
          payload: data,
        });
      } else {
        console.error('Usuario no encontrado en el backend');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario del backend:', error);
    }
  };
};

export const prepareUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: PREPARE_TO_CREATE,
      payload: userData
    });
  };
};

export const displayNameToCreate = (displayName) => {
  return (dispatch) => {
    dispatch({
      type: DISPLAYNAME_TO_CREATE,
      payload: displayName
    });
  };
};
