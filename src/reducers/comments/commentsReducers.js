// reducers/commentsReducer.js
import { initialState } from "../../initialStates/comments";
import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL
} from "../../utils/constants";

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_REQUEST:
        case GET_COMMENTS_REQUEST:
        case DELETE_COMMENT_REQUEST:
            return { ...state, loading: true };
        case COMMENT_SUCCESS:
            return { ...state, loading: false, comments: [...state.comments, action.payload] };
        case GET_COMMENTS_SUCCESS:
            return { ...state, loading: false, comments: action.payload };
        case DELETE_COMMENT_SUCCESS:
            return { ...state, loading: false, comments: state.comments.filter(comment => comment._id !== action.payload._id) };
        case COMMENT_FAIL:
        case GET_COMMENTS_FAIL:
        case DELETE_COMMENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default commentsReducer;
