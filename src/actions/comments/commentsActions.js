import axios from "axios";
import Config from "react-native-config";
import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from "../../utils/constants";

export const createComment = (userId, commentableId, onModel, text) => async (dispatch) => {
    dispatch({ type: COMMENT_REQUEST });
    try {
        const response = await axios.post(`${Config.API_ENDPOINT}comments`, {
            userId,
            commentableId,
            onModel,
            text
        });
        dispatch({
            type: COMMENT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: COMMENT_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

export const getCommentsByEntity = (entityId, onModel) => async (dispatch) => {
    dispatch({ type: GET_COMMENTS_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}comments/${entityId}/${onModel}`);
        dispatch({
            type: GET_COMMENTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
        const response = await axios.delete(`${Config.API_ENDPOINT}comments/${commentId}`);
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
