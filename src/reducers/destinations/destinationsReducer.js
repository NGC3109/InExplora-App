import { initialState } from "../../initialStates/destinations";
import {
    FETCH_THUMBNAILS_REQUEST,
    FETCH_THUMBNAILS_SUCCESS,
    FETCH_THUMBNAILS_FAIL,
    FETCH_DESTINY_REQUEST,
    FETCH_DESTINY_SUCCESS,
    FETCH_DESTINY_FAIL
} from "../../utils/constants";

const destinationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_THUMBNAILS_REQUEST:
        case FETCH_DESTINY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_THUMBNAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                thumbnails: action.payload.data,
                error: null
            };
        case FETCH_DESTINY_SUCCESS:
            return {
                ...state,
                loading: false,
                destiny: action.payload.data,
                error: null
            };
        case FETCH_THUMBNAILS_FAIL:
        case FETCH_DESTINY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default destinationsReducer;
