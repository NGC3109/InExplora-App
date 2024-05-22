import {
    TRANSPORT_REQUEST,
    TRANSPORT_SUCCESS,
    TRANSPORT_FAIL
} from "../../utils/constants";

import { initialState } from "../../initialStates/transports";

const transportReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSPORT_REQUEST:
            return {
                ...state,
                transports: {
                    loading: true,
                    error: null,
                    data: []
                }
            };
        case TRANSPORT_SUCCESS:
            return {
                ...state,
                transports: {
                    error: null,
                    loading: false,
                    data: action.payload.data
                }
            };
        case TRANSPORT_FAIL:
            return {
                ...state,
                transports: {
                    loading: false,
                    error: action.payload,
                    data: []
                }
            };
        default:
            return state;
    }
};

export default transportReducer;
