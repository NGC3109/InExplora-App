import { initialState } from "../../initialStates/notifications";
import { 
  LOAD_NOTIFICATIONS_REQUEST,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
} from "../../utils/constants";

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_REQUEST: return { ...state, notifications: { loading: true,  error: null } };
    case LOAD_NOTIFICATIONS_SUCCESS: return { ...state, notifications: { data: action.payload, loading: false, error: null } };
    case LOAD_NOTIFICATIONS_FAIL: return {...state, notifications: { loading: false, error: action.payload } };
    default: return state;
  }  
};
  
  export default notificationsReducer;
  