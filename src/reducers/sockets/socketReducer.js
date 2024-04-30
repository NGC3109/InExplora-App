import { SET_JOIN_REQUEST_COUNT, SOCKET_CONNECTION_ERROR, SET_UNREAD_MESSAGE_COUNT  } from "../../utils/constants";

const initialState = {
    joinRequestCount: 0,
    socketError: null,
    unreadMessageCount: 0,
};
  
const socketReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_JOIN_REQUEST_COUNT:
        return {
          ...state,
          joinRequestCount: action.payload,
        };
      case SOCKET_CONNECTION_ERROR:
        return {
          ...state,
          socketError: action.payload,
        };
      case SET_UNREAD_MESSAGE_COUNT:
          return {
              ...state,
              unreadMessageCount: action.payload
      };
      default:
        return state;
    }
};

export default socketReducer;