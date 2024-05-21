import { initialState } from "../../initialStates/likes";
import {
    LIKE_GROUP_REQUEST,
    LIKE_GROUP_SUCCESS,
    LIKE_GROUP_FAIL,
    DISLIKE_GROUP_REQUEST,
    DISLIKE_GROUP_SUCCESS,
    DISLIKE_GROUP_FAIL
} from "../../utils/constants";

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_GROUP_REQUEST:
            return { ...state, likeState: { loading: true, error: null } };
        case LIKE_GROUP_SUCCESS:
            return { ...state, likeState: { loading: false, error: null, data: action.payload } };
        case LIKE_GROUP_FAIL:
            return { ...state, likeState: { loading: false, error: action.payload } };
        case DISLIKE_GROUP_REQUEST:
            return { ...state, dislikeState: { loading: true, error: null } };
        case DISLIKE_GROUP_SUCCESS:
            return { ...state, dislikeState: { loading: false, error: null, data: action.payload } };
        case DISLIKE_GROUP_FAIL:
            return { ...state, dislikeState: { loading: false, error: action.payload } };
        default:
            return state;
    }
};

export default groupReducer;
