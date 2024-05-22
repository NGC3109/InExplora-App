import axios from "axios";
import Config from "react-native-config";
import {
    TRANSPORT_REQUEST,
    TRANSPORT_SUCCESS,
    TRANSPORT_FAIL
} from "../../utils/constants";

export const getTransports = () => async (dispatch) => {
    dispatch({ type: TRANSPORT_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}transports`);
        dispatch({
            type: TRANSPORT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: TRANSPORT_FAIL,
            payload: error.response ? error.response.data.error : 'Error desconocido'
        });
    }
};
