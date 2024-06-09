import axios from "axios";
import Config from "react-native-config";
import {
    FETCH_THUMBNAILS_REQUEST,
    FETCH_THUMBNAILS_SUCCESS,
    FETCH_THUMBNAILS_FAIL,
    FETCH_DESTINY_REQUEST,
    FETCH_DESTINY_SUCCESS,
    FETCH_DESTINY_FAIL
} from "../../utils/constants";

// Acción para obtener los thumbnails
export const fetchThumbnails = () => async (dispatch) => {
    dispatch({ type: FETCH_THUMBNAILS_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}destinations/thumbnails`);
        dispatch({
            type: FETCH_THUMBNAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_THUMBNAILS_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

// Acción para obtener un destino por ID
export const fetchDestinyById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_DESTINY_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}destinations/${id}`);
        dispatch({
            type: FETCH_DESTINY_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_DESTINY_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
