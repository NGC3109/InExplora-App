import { initialState } from "../../initialStates/userPublic";
import { 
  SAVE_USER, 
  PREPARE_TO_CREATE, 
  DISPLAYNAME_TO_CREATE, 
  GET_USER, CLEAR_USER, 
  UPDATE_FOLLOWERS_COUNT,
  GENRE_TO_CREATE,
} from "../../utils/constants";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_USER: return { ...state, user: action.payload, };
      case GET_USER: return { ...state, user: action.payload,};
      case PREPARE_TO_CREATE: return { ...state, user: action.payload, };
      case DISPLAYNAME_TO_CREATE: return { ...state, user: { ...state.user, displayName: action.payload, }, };
      case GENRE_TO_CREATE: return { ...state, user: { ...state.user, genre: action.payload, }, };
      case CLEAR_USER: return { ...state, currentUser: null };
      case UPDATE_FOLLOWERS_COUNT: return { ...state, user: { ...state.user, followersCount: action.payload } };
      default: return state;
    }
};
export default userReducer;
  