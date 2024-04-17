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
  SAVE_GROUP_STARTING_TRAVEL
} from "../../utils/constants";

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GROUP_GENRE:
      return {
        ...state,
        groups: {
          ...state.groups,
          genre: action.payload
        }
      };
    case SAVE_GROUP_DESTINATION:
      return {
        ...state,
        groups: {
          ...state.groups,
          destination: action.payload
        }
      };
    case SAVE_GROUP_TRAVELMODE:
      return {
        ...state,
        groups: {
          ...state.groups,
          travelMode: action.payload
        }
      };
    case SAVE_GROUP_ACCOMMODATION:
      return {
        ...state,
        groups: {
          ...state.groups,
          accommodation: action.payload
        }
      };
    case SAVE_GROUP_NUMBEROFPEOPLE:
      return {
        ...state,
        groups: {
          ...state.groups,
          numberOfPeople: action.payload
        }
      };
    case SAVE_GROUP_MINIMUMAGE:
      return {
        ...state,
        groups: {
          ...state.groups,
          minimumAge: action.payload
        }
      };
    case SAVE_GROUP_MAXIMUMAGE:
      return {
        ...state,
        groups: {
          ...state.groups,
          maximumAge: action.payload
        }
      };
    case SAVE_GROUP_TRAVELWITHCHILDREN:
      return {
        ...state,
        groups: {
          ...state.groups,
          travelWithChildren: action.payload
        }
      };
    case SAVE_GROUP_TRAVELWITHPETS:
      return {
        ...state,
        groups: {
          ...state.groups,
          travelWithPets: action.payload
        }
      };
    case SAVE_GROUP_DESCRIPTION:
      return {
        ...state,
        groups: {
          ...state.groups,
          description: action.payload
        }
      };
    case SAVE_GROUP_COVERPHOTO:
      return {
        ...state,
        groups: {
          ...state.groups,
          coverPhoto: action.payload
        }
      };
    case SAVE_GROUP_GALLERY:
      return {
        ...state,
        groups: {
          ...state.groups,
          gallery: action.payload
        }
      };
    case SAVE_GROUP_BUDGET:
      return {
        ...state,
        groups: {
          ...state.groups,
          budget: action.payload
        }
      };
    case SAVE_GROUP_STARTING_TRAVEL:
      return {
        ...state,
        groups: {
          ...state.groups,
          startingTravel: action.payload
        }
      };
    default:
      return state;
  }  
};
  
  export default groupReducer;
  