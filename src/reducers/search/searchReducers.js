import { initialState } from "../../initialStates/search";
import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    CLEAR_SEARCH_RESULTS
} from "../../utils/constants";

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return { loading: true, results: [] };
        case SEARCH_SUCCESS:
            return { loading: false, results: action.payload };
        case SEARCH_FAIL:
            return { loading: false, error: action.payload };
        case CLEAR_SEARCH_RESULTS:
            return { ...state, results: [] };
        default:
            return state;
    }
};

export default searchReducer;