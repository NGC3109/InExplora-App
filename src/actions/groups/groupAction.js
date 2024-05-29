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
    SAVE_DRAFT,
    SAVE_DRAFT_SUCCESS,
    SAVE_DRAFT_FAIL,
    UPDATE_DRAFT,
    UPDATE_DRAFT_SUCCESS,
    UPDATE_DRAFT_FAIL,
} from "../../utils/constants";

export const saveGroupDestinationAndCreateDraft = (userId, destination) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el destino en el estado de Redux
    dispatch({
      type: SAVE_GROUP_DESTINATION,
      payload: destination
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Creamos el borrador con los datos actuales
    dispatch({ type: SAVE_DRAFT });
    try {
      const response = await axios.post(`${Config.API_ENDPOINT}drafts/create`, { userId, draftData: { ...groups, destination } });
      dispatch({
        type: SAVE_DRAFT_SUCCESS,
        payload: { data: response.data.draft, id: response.data.id }
      });
    } catch (error) {
      dispatch({
        type: SAVE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupGenreAndUpdateDraft = (draftId, genre) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el género en el estado de Redux
    dispatch({
      type: SAVE_GROUP_GENRE,
      payload: genre
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, genre } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupDestinationAndUpdateDraft = (draftId, destination) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el destino en el estado de Redux
    dispatch({
      type: SAVE_GROUP_DESTINATION,
      payload: destination
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, destination } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupTravelModeAndUpdateDraft = (draftId, travelMode) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el modo de viaje en el estado de Redux
    dispatch({
      type: SAVE_GROUP_TRAVELMODE,
      payload: travelMode
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelMode } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupStartingTravelAndUpdateDraft = (draftId, startingTravel) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la fecha de inicio del viaje en el estado de Redux
    dispatch({
      type: SAVE_GROUP_STARTING_TRAVEL,
      payload: startingTravel
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, startingTravel } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupBudgetAndUpdateDraft = (draftId, budget) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el presupuesto en el estado de Redux
    dispatch({
      type: SAVE_GROUP_BUDGET,
      payload: budget
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, budget } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupGalleryAndUpdateDraft = (draftId, gallery) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la galería en el estado de Redux
    dispatch({
      type: SAVE_GROUP_GALLERY,
      payload: gallery
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, gallery } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupDescriptionAndUpdateDraft = (draftId, description) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la descripción en el estado de Redux
    dispatch({
      type: SAVE_GROUP_DESCRIPTION,
      payload: description
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, description } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupTravelWithPetsAndUpdateDraft = (draftId, travelWithPets) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la información de viajar con mascotas en el estado de Redux
    dispatch({
      type: SAVE_GROUP_TRAVELWITHPETS,
      payload: travelWithPets
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelWithPets } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupTravelWithChildrenAndUpdateDraft = (draftId, travelWithChildren) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la información de viajar con niños en el estado de Redux
    dispatch({
      type: SAVE_GROUP_TRAVELWITHCHILDREN,
      payload: travelWithChildren
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelWithChildren } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupAgeRangeAndUpdateDraft = (draftId, minimumAge, maximumAge) => {
  return async (dispatch, getState) => {
    // Primero despachamos las acciones para guardar la edad mínima y máxima en el estado de Redux
    dispatch({
      type: SAVE_GROUP_MINIMUMAGE,
      payload: minimumAge
    });
    dispatch({
      type: SAVE_GROUP_MAXIMUMAGE,
      payload: maximumAge
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, minimumAge, maximumAge } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupNumberOfPeopleAndUpdateDraft = (draftId, numberOfPeople) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar el número de personas en el estado de Redux
    dispatch({
      type: SAVE_GROUP_NUMBEROFPEOPLE,
      payload: numberOfPeople
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, numberOfPeople } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

export const saveGroupAccommodationAndUpdateDraft = (draftId, accommodation) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar la acomodación en el estado de Redux
    dispatch({
      type: SAVE_GROUP_ACCOMMODATION,
      payload: accommodation
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, accommodation } });
      dispatch({
        type: UPDATE_DRAFT_SUCCESS,
        payload: response.data.draft
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRAFT_FAIL,
        payload: error.response ? error.response.data.error : 'Error desconocido'
      });
    }
  };
};

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
    console.log(`${Config.API_ENDPOINT}groups/${groupId}`)
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