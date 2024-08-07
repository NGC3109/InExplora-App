// chatReducer.js
import { ADD_MESSAGE, LOAD_MESSAGES, CLEAR_MESSAGES, UPDATE_MESSAGE_ID } from '../../utils/constants';

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    case UPDATE_MESSAGE_ID:
      return {
        ...state,
        messages: state.messages.map(msg => 
          msg._id === action.payload.tempId ? { ...msg, _id: action.payload.realId } : msg
        ),
      };
    default:
      return state;
  }
};

export default chatReducer;
