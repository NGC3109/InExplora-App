import { initialState } from "../../initialStates/bookmark";
import {
    BOOKMARK_REQUEST,
    BOOKMARK_SUCCESS,
    BOOKMARK_FAIL,
    REMOVE_BOOKMARK_REQUEST,
    REMOVE_BOOKMARK_SUCCESS,
    REMOVE_BOOKMARK_FAIL
} from "../../utils/constants";

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKMARK_REQUEST:
        case REMOVE_BOOKMARK_REQUEST:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    loading: true,
                    error: null
                }
            };
        case BOOKMARK_SUCCESS:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    loading: false,
                    data: [...state.bookmarks.data, action.payload.data],
                    error: null
                }
            };
        case REMOVE_BOOKMARK_SUCCESS:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    loading: false,
                    data: state.bookmarks.data.filter(bookmark => bookmark._id !== action.payload.data._id),
                    error: null
                }
            };
        case BOOKMARK_FAIL:
        case REMOVE_BOOKMARK_FAIL:
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    loading: false,
                    error: action.payload
                }
            };
        default:
            return state;
    }
};

export default bookmarkReducer;