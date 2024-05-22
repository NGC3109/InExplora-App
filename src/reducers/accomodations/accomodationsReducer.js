import {
    ACCOMMODATION_REQUEST,
    ACCOMMODATION_SUCCESS,
    ACCOMMODATION_FAIL
} from "../../utils/constants";

import { initialState } from "../../initialStates/accomodations";

const accommodationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOMMODATION_REQUEST:
            return {
                ...state,
                accommodations: {
                    ...state.accommodations,
                    loading: true,
                    error: null
                }
            };
        case ACCOMMODATION_SUCCESS:
            return {
                ...state,
                accommodations: {
                    ...state.accommodations,
                    loading: false,
                    data: action.payload.data,
                    error: null
                }
            };
        case ACCOMMODATION_FAIL:
            return {
                ...state,
                accommodations: {
                    ...state.accommodations,
                    loading: false,
                    error: action.payload,
                    data: []
                }
            };
        default:
            return state;
    }
};

export default accommodationReducer;
