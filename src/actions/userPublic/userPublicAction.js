import axios from 'axios';
import Config from 'react-native-config';
import {
    LOAD_USER_BY_ID_SUCCESS, 
    LOAD_USER_BY_ID_REQUEST, 
    LOAD_USER_BY_ID_FAIL,
    UPDATE_PUBLIC_FOLLOWERS_COUNT
} from '../../utils/constants';

export const updateFollowersCount = (newCount) => ({
  type: UPDATE_PUBLIC_FOLLOWERS_COUNT,
  payload: newCount,
});

export const getUserById = (userId, currentUserId) => async (dispatch) => {
  dispatch({ type: LOAD_USER_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${Config.API_ENDPOINT}users/userId/${userId}/currentUserId/${currentUserId}`);
    const data = response.data;
    if (data) {
      dispatch({
        type: LOAD_USER_BY_ID_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_BY_ID_FAIL,
        payload: 'Usuario no encontrado en el backend'
      });
      console.error('Usuario no encontrado en el backend');
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_BY_ID_FAIL,
      payload: error.response ? error.response.data.error : 'Error al obtener datos del usuario del backend'
    });
    console.error('Error al obtener datos del usuario del backend:', error);
  }
};
