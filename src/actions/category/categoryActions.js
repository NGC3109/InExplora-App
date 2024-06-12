import axios from 'axios';
import Config from 'react-native-config';
import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAIL
} from '../../utils/constants';

export const fetchCategoryByRegion = (region) => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORY_REQUEST });
    try {
        const response = await axios.get(`${Config.API_ENDPOINT}category`, {
            params: { region }
        });
        dispatch({
            type: FETCH_CATEGORY_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CATEGORY_FAIL,
            payload: error.response ? error.response.data.message : 'Error desconocido'
        });
    }
};
