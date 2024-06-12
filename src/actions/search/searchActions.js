import axios from "axios";
import Config from "react-native-config";
import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    CLEAR_SEARCH_RESULTS
} from "../../utils/constants";

export const search = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST });
    console.log(`${Config.API_ENDPOINT}search`)
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}search`, {
            params: { query }
        });
        dispatch({
            type: SEARCH_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: SEARCH_FAIL,
            payload: error.response ? error.response.data.message : 'Error desconocido'
        });
    }
};

export const clearSearchResults = () => (dispatch) => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
};