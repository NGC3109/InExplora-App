import axios from "axios";
import Config from "react-native-config";
import {
    LOAD_NOTIFICATIONS_REQUEST,
    LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_NOTIFICATIONS_FAIL,
} from "../../utils/constants";

export const loadGeneralNotificationsByGroupId = (userId) => async (dispatch) => {
    dispatch({ type: LOAD_NOTIFICATIONS_REQUEST });
    try {
      console.log(`${Config.API_ENDPOINT}notifications/user/${userId}`)
      const response = await axios.get(`${Config.API_ENDPOINT}notifications/user/${userId}`);
      dispatch({
        type: LOAD_NOTIFICATIONS_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: LOAD_NOTIFICATIONS_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
};