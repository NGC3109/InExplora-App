import axios from "axios";
import Config from "react-native-config";
import {
    BOOKMARK_REQUEST,
    BOOKMARK_SUCCESS,
    BOOKMARK_FAIL,
    REMOVE_BOOKMARK_REQUEST,
    REMOVE_BOOKMARK_SUCCESS,
    REMOVE_BOOKMARK_FAIL
} from "../../utils/constants";

export const bookmark = (userId, bookmarkableId, onModel) => async (dispatch) => {
    dispatch({ type: BOOKMARK_REQUEST });
    try {
        console.log('userId, bookmarkableId, onModel: ', userId, bookmarkableId, onModel)
        console.log(`${Config.API_ENDPOINT}bookmarks`)
        const response = await axios.post(`${Config.API_ENDPOINT}bookmarks`, {
            userId,
            bookmarkableId,
            onModel
        });
        dispatch({
            type: BOOKMARK_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: BOOKMARK_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

export const removeBookmark = (bookmarkId) => async (dispatch) => {
    dispatch({ type: REMOVE_BOOKMARK_REQUEST });
    try {
        console.log('book: ', bookmarkId)
        console.log(`${Config.API_ENDPOINT}bookmarks/${bookmarkId}`)
        const response = await axios.delete(`${Config.API_ENDPOINT}bookmarks/${bookmarkId}`);
        dispatch({
            type: REMOVE_BOOKMARK_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: REMOVE_BOOKMARK_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};