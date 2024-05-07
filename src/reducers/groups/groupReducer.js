import { initialState } from "../../initialStates/users/userInitial";
import { 
  SAVE_GROUP_DESTINATION, 
  SAVE_GROUP_TRAVELMODE, 
  SAVE_GROUP_ACCOMMODATION,
  SAVE_GROUP_NUMBEROFPEOPLE,
  SAVE_GROUP_MINIMUMAGE,
  SAVE_GROUP_MAXIMUMAGE,
  SAVE_GROUP_TRAVELWITHCHILDREN,
  SAVE_GROUP_TRAVELWITHPETS,
  SAVE_GROUP_DESCRIPTION,
  SAVE_GROUP_COVERPHOTO,
  SAVE_GROUP_GALLERY,
  SAVE_GROUP_BUDGET,
  SAVE_GROUP_GENRE,
  SAVE_GROUP_STARTING_TRAVEL,
  LOAD_GROUP_BY_USER_REQUEST,
  LOAD_GROUP_BY_USER_SUCCESS,
  LOAD_GROUP_BY_USER_FAIL,
  LOAD_GROUPS_REQUEST,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_FAIL,
  LOAD_GROUP_BY_ID_REQUEST, 
  LOAD_GROUP_BY_ID_SUCCESS, 
  LOAD_GROUP_BY_ID_FAIL,
  REQUEST_TO_JOIN_GROUP_REQUEST,
  REQUEST_TO_JOIN_GROUP_SUCCESS,
  REQUEST_TO_JOIN_GROUP_FAIL,
  LOAD_JOIN_REQUESTS_REQUEST,
  LOAD_JOIN_REQUESTS_SUCCESS,
  LOAD_JOIN_REQUESTS_FAIL,
  SAVE_JOIN_MESSAGE,
  ACCEPT_JOIN_REQUEST_REQUEST,
  ACCEPT_JOIN_REQUEST_SUCCESS,
  ACCEPT_JOIN_REQUEST_FAIL,
} from "../../utils/constants";

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_JOIN_REQUEST_REQUEST: return { ...state, joinRequestState: { loading: true, error: null } };
    case ACCEPT_JOIN_REQUEST_SUCCESS: return { ...state, joinRequestState: {loading: false, data: action.payload, error: null} };
    case ACCEPT_JOIN_REQUEST_FAIL: return { ...state, joinRequestState: {loading: false, error: action.payload} };
    case SAVE_JOIN_MESSAGE: return { ...state, sendRequestToJoin: { ...state.sendRequestToJoin, message: action.payload } };
    case LOAD_JOIN_REQUESTS_REQUEST: return { ...state, joinRequests: { loading: true,  error: null } };
    case LOAD_JOIN_REQUESTS_SUCCESS: return { ...state, joinRequests: { data: action.payload, loading: false, error: null } };
    case LOAD_JOIN_REQUESTS_FAIL: return {...state, joinRequests: { loading: false, error: action.payload } };
    case REQUEST_TO_JOIN_GROUP_REQUEST: return { ...state, requestToJoin: { loading: true, error: null } };
    case REQUEST_TO_JOIN_GROUP_SUCCESS: return { ...state, requestToJoin: { loading: false, data: action.payload } };
    case REQUEST_TO_JOIN_GROUP_FAIL: return { ...state, requestToJoin: { loading: false, error: action.payload } };
    case LOAD_GROUP_BY_ID_REQUEST: return { ...state, groupDetails: { loading: true } };
    case LOAD_GROUP_BY_ID_SUCCESS: return { ...state, groupDetails: { data: action.payload, loading: false } };
    case LOAD_GROUP_BY_ID_FAIL: return { ...state, groupDetails: { loading: false, error: action.payload } };
    case LOAD_GROUPS_REQUEST: return { ...state, allGroups: { loading: true } };
    case LOAD_GROUPS_SUCCESS: return { ...state, allGroups: { data: action.payload, loading: false } };
    case LOAD_GROUPS_FAIL: return { ...state, allGroups: { error: action.payload, loading: false } };
    case LOAD_GROUP_BY_USER_REQUEST: return { ...state, groupsByUser: { loading: true, data: null, error: null } };
    case LOAD_GROUP_BY_USER_SUCCESS: return {...state, groupsByUser: { loading: false, data: action.payload, error: null } };
    case LOAD_GROUP_BY_USER_FAIL: return {...state, groupsByUser: { loading: false, data: null, error: action.payload } };
    case SAVE_GROUP_GENRE: return {...state, groups: { ...state.groups, genre: action.payload } };
    case SAVE_GROUP_DESTINATION: return { ...state, groups: { ...state.groups, destination: action.payload }};
    case SAVE_GROUP_TRAVELMODE: return { ...state, groups: { ...state.groups, travelMode: action.payload }};
    case SAVE_GROUP_ACCOMMODATION: return { ...state, groups: { ...state.groups, accommodation: action.payload }};
    case SAVE_GROUP_NUMBEROFPEOPLE: return { ...state, groups: { ...state.groups, numberOfPeople: action.payload }};
    case SAVE_GROUP_MINIMUMAGE: return { ...state, groups: { ...state.groups, minimumAge: action.payload }};
    case SAVE_GROUP_MAXIMUMAGE: return { ...state, groups: { ...state.groups, maximumAge: action.payload }};
    case SAVE_GROUP_TRAVELWITHCHILDREN: return { ...state, groups: { ...state.groups, travelWithChildren: action.payload }};
    case SAVE_GROUP_TRAVELWITHPETS: return { ...state, groups: { ...state.groups, travelWithPets: action.payload }};
    case SAVE_GROUP_DESCRIPTION: return { ...state, groups: { ...state.groups, description: action.payload }};
    case SAVE_GROUP_COVERPHOTO: return { ...state, groups: { ...state.groups, coverPhoto: action.payload }};
    case SAVE_GROUP_GALLERY: return { ...state, groups: { ...state.groups, gallery: action.payload }};
    case SAVE_GROUP_BUDGET: return { ...state, groups: { ...state.groups, budget: action.payload }};
    case SAVE_GROUP_STARTING_TRAVEL: return { ...state, groups: { ...state.groups, startingTravel: action.payload }};
    default: return state;
  }  
};
  
  export default groupReducer;
  