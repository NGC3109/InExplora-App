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
} from "../../utils/constants";

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
  