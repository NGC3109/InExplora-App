import axios from "axios";
import Config from "react-native-config";
import {
    REQUEST_TO_JOIN_GROUP_REQUEST,
    REQUEST_TO_JOIN_GROUP_SUCCESS,
    REQUEST_TO_JOIN_GROUP_FAIL,
    ACCEPT_JOIN_REQUEST_REQUEST,
    ACCEPT_JOIN_REQUEST_SUCCESS,
    ACCEPT_JOIN_REQUEST_FAIL,
    LOAD_GENERAL_REQUESTS_REQUEST,
    LOAD_GENERAL_REQUESTS_SUCCESS,
    LOAD_GENERAL_REQUESTS_FAIL,
    SET_JOIN_REQUEST_COUNT,
} from "../../utils/constants";

export const requestToJoinGroup = (userId, groupId, message, userCreator) => async (dispatch) => {
    dispatch({ type: REQUEST_TO_JOIN_GROUP_REQUEST });
    try {
      const requestBody = { message };
      const response = await axios.post(`${Config.API_ENDPOINT}request/groups/${groupId}/join/${userId}/userCreator/${userCreator}`, requestBody);
      dispatch({
        type: REQUEST_TO_JOIN_GROUP_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: REQUEST_TO_JOIN_GROUP_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
};


export const acceptJoinRequest = (requestId, accepOrReject) => async (dispatch) => {
    dispatch({ type: ACCEPT_JOIN_REQUEST_REQUEST });
    try {
      const response = await axios.patch(`${Config.API_ENDPOINT}request/joinRequests/${requestId}`, { action: accepOrReject });
      dispatch({
        type: ACCEPT_JOIN_REQUEST_SUCCESS,
        payload: response.data
      });
      dispatch({
        type: SET_JOIN_REQUEST_COUNT,
        payload: response.data.pendingRequestCount
      })
    } catch (error) {
      dispatch({
        type: ACCEPT_JOIN_REQUEST_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
};

export const loadGeneralRequestsByGroupId = (userId) => async (dispatch) => {
    dispatch({ type: LOAD_GENERAL_REQUESTS_REQUEST });
    try {
      const response = await axios.get(`${Config.API_ENDPOINT}request/user/${userId}`);
      dispatch({
        type: LOAD_GENERAL_REQUESTS_SUCCESS,
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: LOAD_GENERAL_REQUESTS_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
};