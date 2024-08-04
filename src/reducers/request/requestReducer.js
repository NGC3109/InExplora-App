import { initialState } from "../../initialStates/request";
import { 
  LOAD_GENERAL_REQUESTS_REQUEST,
  LOAD_GENERAL_REQUESTS_SUCCESS,
  LOAD_GENERAL_REQUESTS_FAIL,
} from "../../utils/constants";

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GENERAL_REQUESTS_REQUEST: return { ...state, generalRequests: { loading: true,  error: null } };
    case LOAD_GENERAL_REQUESTS_SUCCESS: return { ...state, generalRequests: { data: action.payload, loading: false, error: null } };
    case LOAD_GENERAL_REQUESTS_FAIL: return {...state, generalRequests: { loading: false, error: action.payload } };
    default: return state;
  }  
};
  
export default requestReducer;
