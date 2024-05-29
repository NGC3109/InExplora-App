import { initialState } from "../../initialStates/userPublic";
import {
  UPDATE_PUBLIC_FOLLOWERS_COUNT, 
  LOAD_USER_BY_ID_FAIL,
  LOAD_USER_BY_ID_SUCCESS,
  LOAD_USER_BY_ID_REQUEST
} from "../../utils/constants";

const userPublicReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PUBLIC_FOLLOWERS_COUNT:
      return { 
        ...state, 
        userPublic: { 
          ...state.userPublic, 
          followersCount: action.payload 
        } 
      };
    case LOAD_USER_BY_ID_SUCCESS:
      return { 
        ...state, 
        userPublic: { 
          data: action.payload,
          error: null, 
          loading: false 
        },
      };
    case LOAD_USER_BY_ID_FAIL:
      return { 
        ...state, 
        userPublic: {
          data: [],
          error: action.payload, 
          loading: false 
        },
      };
    case LOAD_USER_BY_ID_REQUEST:
      return { 
        ...state, 
        userPublic: { 
          loading: true,
          error: null,
          data: [] 
        },
      };
    default:
      return state;
  }
};

export default userPublicReducer;
