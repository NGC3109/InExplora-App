import { initialState } from "../../initialStates/users/userInitial";
import { SAVE_USER } from "../../utils/constants";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_USER:
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
};
export default userReducer;
  