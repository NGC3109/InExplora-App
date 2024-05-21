import axios from "axios";
import Config from "react-native-config";
import {
    LIKE_GROUP_REQUEST,
    LIKE_GROUP_SUCCESS,
    LIKE_GROUP_FAIL,
    DISLIKE_GROUP_REQUEST,
    DISLIKE_GROUP_SUCCESS,
    DISLIKE_GROUP_FAIL
} from "../../utils/constants";

export const likeGroup = (userId, groupId) => async (dispatch) => {
    dispatch({ type: LIKE_GROUP_REQUEST });
    try {
        const response = await axios.post(`${Config.API_ENDPOINT}likes`, {
            userId,
            likeableId: groupId,
            onModel: "Group"
        });
        dispatch({
            type: LIKE_GROUP_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: LIKE_GROUP_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

export const dislikeGroup = (likeId) => async (dispatch) => {
    dispatch({ type: DISLIKE_GROUP_REQUEST });
    try {
        console.log(`${Config.API_ENDPOINT}likes/${likeId}`)
        const response = await axios.delete(`${Config.API_ENDPOINT}likes/${likeId}`);
        dispatch({
            type: DISLIKE_GROUP_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: DISLIKE_GROUP_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
