import { initialState } from '../../initialStates/category';
import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAIL
} from '../../utils/constants';

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CATEGORY_SUCCESS:
            return { ...state, loading: false, categories: action.payload.data };
        case FETCH_CATEGORY_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default categoryReducer;
