import axios from "axios";
import Config from "react-native-config";
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
    LOAD_GROUP_BY_USER_SUCCESS,
    LOAD_GROUP_BY_USER_FAIL,
    LOAD_GROUP_BY_USER_REQUEST,
    LOAD_GROUPS_REQUEST, 
    LOAD_GROUPS_SUCCESS, 
    LOAD_GROUPS_FAIL,
    LOAD_GROUP_BY_ID_REQUEST, 
    LOAD_GROUP_BY_ID_SUCCESS, 
    LOAD_GROUP_BY_ID_FAIL,
    LOAD_JOIN_REQUESTS_REQUEST,
    LOAD_JOIN_REQUESTS_SUCCESS,
    LOAD_JOIN_REQUESTS_FAIL,
} from "../../utils/constants";

export const loadJoinRequestsByGroupId = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_JOIN_REQUESTS_REQUEST });
  try {
    const response = await axios.get(`${Config.API_ENDPOINT}groups/${userId}/join-requests`);
    dispatch({
      type: LOAD_JOIN_REQUESTS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_JOIN_REQUESTS_FAIL,
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};

export const loadGroupById = (groupId) => async (dispatch) => {
  dispatch({ type: LOAD_GROUP_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${Config.API_ENDPOINT}groups/${groupId}`);
    dispatch({
      type: LOAD_GROUP_BY_ID_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_GROUP_BY_ID_FAIL,
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};

export const loadGroups = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_GROUPS_REQUEST });
  try {
    const requestBody = {
      userId: userId
    };
    const response = await axios.post(`${Config.API_ENDPOINT}groups/`, requestBody);
    dispatch({
      type: LOAD_GROUPS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_GROUPS_FAIL,
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};

export const loadGroupByUser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_GROUP_BY_USER_REQUEST });
  try {
    const response = await axios.get(`${Config.API_ENDPOINT}groups/user/${userId}`);
    dispatch({
      type: LOAD_GROUP_BY_USER_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_GROUP_BY_USER_FAIL,
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};

export const saveGroupGenre = (genre) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_GROUP_GENRE,
      payload: genre
    });
  };
};

export const saveGroupDestination = (destination) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_DESTINATION,
        payload: destination
      });
    };
};
  
export const saveGroupTravelMode = (travelMode) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_GROUP_TRAVELMODE,
      payload: travelMode
    });
  };
};
export const saveGroupAccommodation = (accommodation) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_ACCOMMODATION,
        payload: accommodation
      });
    };
  };
  
  export const saveGroupNumberOfPeople = (numberOfPeople) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_NUMBEROFPEOPLE,
        payload: numberOfPeople
      });
    };
  };
  
  export const saveGroupMinimumAge = (minimumAge) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_MINIMUMAGE,
        payload: minimumAge
      });
    };
  };
  
  export const saveGroupMaximumAge = (maximumAge) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_MAXIMUMAGE,
        payload: maximumAge
      });
    };
  };
  
  export const saveGroupTravelWithChildren = (travelWithChildren) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_TRAVELWITHCHILDREN,
        payload: travelWithChildren
      });
    };
  };
  
  export const saveGroupTravelWithPets = (travelWithPets) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_TRAVELWITHPETS,
        payload: travelWithPets
      });
    };
  };
  
  export const saveGroupDescription = (description) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_DESCRIPTION,
        payload: description
      });
    };
  };
  
  export const saveGroupCoverPhoto = (coverPhoto) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_COVERPHOTO,
        payload: coverPhoto
      });
    };
  };
  
  export const saveGroupGallery = (gallery) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_GALLERY,
        payload: gallery
      });
    };
  };
  
  export const saveGroupBudget = (budget) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_BUDGET,
        payload: budget
      });
    };
  };
  
  export const saveGroupStartingTravel = (startingTravel) => {
    return (dispatch) => {
      dispatch({
        type: SAVE_GROUP_STARTING_TRAVEL,
        payload: startingTravel
      });
    };
  };
  