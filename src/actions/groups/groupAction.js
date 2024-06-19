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
    LOAD_DRAFT_BY_USER,
    LOAD_DRAFT_BY_USER_SUCCESS, 
    LOAD_DRAFT_BY_USER_FAIL,
    LOAD_DRAFT_BY_USER_SUCCESS_GROUP,
    DELETE_DRAFT,
    DELETE_DRAFT_SUCCESS,
    DELETE_DRAFT_FAIL,
    SAVE_GROUP_DATES,
} from "../../utils/constants";

export const saveGroupDatesAndUpdateDraft = (draftId, startDate, endDate) => {
  return async (dispatch, getState) => {
    // Primero despachamos la acción para guardar las fechas en el estado de Redux
    dispatch({
      type: SAVE_GROUP_DATES,
      payload: { startDate, endDate }
    });

    // Luego obtenemos el estado actualizado
    const { groupReducer: { groups } } = getState();

    // Actualizamos el borrador con los datos actuales
    dispatch({ type: UPDATE_DRAFT });
    console.log(`${Config.API_ENDPOINT}drafts/update`)
    console.log('draftId: ', draftId)
    console.log('fechas: ', startDate, endDate)
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelDate: { startDate, endDate } }, currentStep: 'step1' });
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
      const response = await axios.post(`${Config.API_ENDPOINT}drafts/create`, { userId, draftData: { ...groups, destination }, currentStep: 'step1' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, genre }, currentStep: 'step2' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelMode }, currentStep: 'step3' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, startingTravel }, currentStep: 'step9' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, budget }, currentStep: 'step8_9_1' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, description }, currentStep: 'step8_9' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelWithPets }, currentStep: 'step8' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, travelWithChildren }, currentStep: 'step7' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, minimumAge, maximumAge }, currentStep: 'step6' });
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
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, numberOfPeople }, currentStep: 'step5' });
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
    console.log('draftId: ', draftId)
    try {
      const response = await axios.put(`${Config.API_ENDPOINT}drafts/update`, { draftId, draftData: { ...groups, accommodation }, currentStep: 'step4' });
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

export const loadGroupById = (groupId, userId) => async (dispatch) => {
  dispatch({ type: LOAD_GROUP_BY_ID_REQUEST });
  try {
    console.log(`${Config.API_ENDPOINT}groups/${groupId}/userId/${userId}`)
    const response = await axios.get(`${Config.API_ENDPOINT}groups/${groupId}/userId/${userId}`);
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

export const loadGroups = (userId, ageRange, budget, gender, travelWithPets, travelWithChildren, selectedTransport) => async (dispatch) => {
  dispatch({ type: LOAD_GROUPS_REQUEST });
  try {
    const requestBody = {
      userId: userId,
      ageRange, 
      budget, 
      gender, 
      travelWithPets, 
      travelWithChildren, 
      selectedTransport
    };
    console.log(`${Config.API_ENDPOINT}groups/`, requestBody)
    const response = await axios.post(`${Config.API_ENDPOINT}groups/`, requestBody);
    dispatch({
      type: LOAD_GROUPS_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_GROUPS_FAIL,
      payload: error.response ? error.response.data.error : 'Unknown error'
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

export const loadDraftByUser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_DRAFT_BY_USER });
  try {
    const response = await axios.get(`${Config.API_ENDPOINT}drafts/${userId}`);
    const draft = response.data[0];
    dispatch({
      type: LOAD_DRAFT_BY_USER_SUCCESS, 
      payload: draft
    });
    dispatch({
      type: LOAD_DRAFT_BY_USER_SUCCESS_GROUP, 
      payload: draft.data
    });
  } catch (error) {
    dispatch({
      type: LOAD_DRAFT_BY_USER_FAIL, 
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};

export const deleteDraft = (draftId) => async (dispatch) => {
  dispatch({ type: DELETE_DRAFT });
  try {
    await axios.delete(`${Config.API_ENDPOINT}drafts/${draftId}`);
    dispatch({
      type: DELETE_DRAFT_SUCCESS,
      payload: draftId
    });
  } catch (error) {
    dispatch({
      type: DELETE_DRAFT_FAIL,
      payload: error.response ? error.response.data.error : 'Error desconocido'
    });
  }
};