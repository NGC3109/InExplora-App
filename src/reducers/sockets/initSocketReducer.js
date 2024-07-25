import { SET_SOCKET } from "../../utils/constants";

const initialState = {
    socket: null
};

 const initSocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        default:
            return state;
    }
}

export default initSocketReducer
