import axios from "axios";
import Config from "react-native-config";
import {
    GET_DESTINATIONS_BY_SEASON_REQUEST,
    GET_DESTINATIONS_BY_SEASON_SUCCESS,
    GET_DESTINATIONS_BY_SEASON_FAIL,
    GET_ALL_DESTINATIONS_WITH_FLAGS_REQUEST,
    GET_ALL_DESTINATIONS_WITH_FLAGS_SUCCESS,
    GET_ALL_DESTINATIONS_WITH_FLAGS_FAIL,
    GET_DESTINATIONS_BY_FEATURED_REQUEST,
    GET_DESTINATIONS_BY_FEATURED_SUCCESS,
    GET_DESTINATIONS_BY_FEATURED_FAIL,
    GET_DESTINATIONS_BY_HAUNTED_REQUEST,
    GET_DESTINATIONS_BY_HAUNTED_SUCCESS,
    GET_DESTINATIONS_BY_HAUNTED_FAIL,
    GET_DESTINATIONS_BY_AMAZING_REQUEST,
    GET_DESTINATIONS_BY_AMAZING_SUCCESS,
    GET_DESTINATIONS_BY_AMAZING_FAIL
} from "../../utils/constants";

// Obtener destinos según la estación actual
export const getDestinationsBySeason = (limit, userId) => async (dispatch) => {
    dispatch({ type: GET_DESTINATIONS_BY_SEASON_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}dashboard/season/${limit}/${userId}`, {
            params: { limit, userId }
        });
        dispatch({
            type: GET_DESTINATIONS_BY_SEASON_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_DESTINATIONS_BY_SEASON_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

// Obtener todos los destinos con sus flags
export const getAllDestinationsWithFlags = (limit) => async (dispatch) => {
    dispatch({ type: GET_ALL_DESTINATIONS_WITH_FLAGS_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}dashboard/flags`, {
            params: { limit }
        });
        dispatch({
            type: GET_ALL_DESTINATIONS_WITH_FLAGS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_DESTINATIONS_WITH_FLAGS_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Obtener destinos filtrados por un flag específico
export const getDestinationsHaunted = (limit, userId) => async (dispatch) => {
    dispatch({ type: GET_DESTINATIONS_BY_HAUNTED_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}dashboard/haunted/${limit}/${userId}`);
        dispatch({
            type: GET_DESTINATIONS_BY_HAUNTED_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_DESTINATIONS_BY_HAUNTED_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
// Obtener destinos filtrados por un flag específico
export const getDestinationsAmazing = (limit, userId) => async (dispatch) => {
    dispatch({ type: GET_DESTINATIONS_BY_AMAZING_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}dashboard/amazing/${limit}/${userId}`, {
            params: { limit, userId }
        });
        dispatch({
            type: GET_DESTINATIONS_BY_AMAZING_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_DESTINATIONS_BY_AMAZING_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
// Obtener destinos filtrados por un flag específico
export const getDestinationsFeatured = (limit, userId) => async (dispatch) => {
    dispatch({ type: GET_DESTINATIONS_BY_FEATURED_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}dashboard/featured/${limit}/${userId}`, {
            params: { limit, userId }
        });
        dispatch({
            type: GET_DESTINATIONS_BY_FEATURED_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_DESTINATIONS_BY_FEATURED_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
