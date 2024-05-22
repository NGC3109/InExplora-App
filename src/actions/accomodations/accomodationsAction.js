import axios from "axios";
import Config from "react-native-config";
import {
    ACCOMMODATION_REQUEST,
    ACCOMMODATION_SUCCESS,
    ACCOMMODATION_FAIL
} from "../../utils/constants";

export const getAccommodations = () => async (dispatch) => {
    dispatch({ type: ACCOMMODATION_REQUEST });
    try {
        console.log(`${Config.API_ENDPOINT}accommodations`)
        const response = await axios.get(`${Config.API_ENDPOINT}accommodations`);
        dispatch({
            type: ACCOMMODATION_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ACCOMMODATION_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
