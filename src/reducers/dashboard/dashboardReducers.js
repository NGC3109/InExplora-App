import { initialState } from "../../initialStates/dashboard";
import {
    GET_DESTINATIONS_BY_SEASON_REQUEST,
    GET_DESTINATIONS_BY_SEASON_SUCCESS,
    GET_DESTINATIONS_BY_SEASON_FAIL,
    GET_ALL_DESTINATIONS_WITH_FLAGS_REQUEST,
    GET_ALL_DESTINATIONS_WITH_FLAGS_SUCCESS,
    GET_ALL_DESTINATIONS_WITH_FLAGS_FAIL,
    GET_DESTINATIONS_BY_FEATURED_REQUEST,
    GET_DESTINATIONS_BY_FEATURED_SUCCESS,
    GET_DESTINATIONS_BY_FEATURED_FAIL,
    GET_DESTINATIONS_BY_HAUNTED_REQUEST,
    GET_DESTINATIONS_BY_HAUNTED_SUCCESS,
    GET_DESTINATIONS_BY_HAUNTED_FAIL,
    GET_DESTINATIONS_BY_AMAZING_REQUEST,
    GET_DESTINATIONS_BY_AMAZING_SUCCESS,
    GET_DESTINATIONS_BY_AMAZING_FAIL
} from "../../utils/constants";

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DESTINATIONS_BY_SEASON_REQUEST:
            return {
                ...state,
                seasonDestinations: {
                    ...state.seasonDestinations,
                    loading: true,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_SEASON_SUCCESS:
            return {
                ...state,
                seasonDestinations: {
                    ...state.seasonDestinations,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_SEASON_FAIL:
            return {
                ...state,
                seasonDestinations: {
                    ...state.seasonDestinations,
                    loading: false,
                    error: action.payload
                }
            };
        case GET_ALL_DESTINATIONS_WITH_FLAGS_REQUEST:
            return {
                ...state,
                destinations: {
                    ...state.destinations,
                    loading: true,
                    error: null
                }
            };
        case GET_ALL_DESTINATIONS_WITH_FLAGS_SUCCESS:
            return {
                ...state,
                destinations: {
                    ...state.destinations,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            };
        case GET_ALL_DESTINATIONS_WITH_FLAGS_FAIL:
            return {
                ...state,
                destinations: {
                    ...state.destinations,
                    loading: false,
                    error: action.payload
                }
            };
        case GET_DESTINATIONS_BY_FEATURED_REQUEST:
            return {
                ...state,
                featuredDestinations: {
                    ...state.featuredDestinations,
                    loading: true,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_FEATURED_SUCCESS:
            return {
                ...state,
                featuredDestinations: {
                    ...state.featuredDestinations,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_FEATURED_FAIL:
            return {
                ...state,
                featuredDestinations: {
                    ...state.featuredDestinations,
                    loading: false,
                    error: action.payload
                }
            };
        case GET_DESTINATIONS_BY_HAUNTED_REQUEST:
            return {
                ...state,
                hauntedDestinations: {
                    ...state.hauntedDestinations,
                    loading: true,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_HAUNTED_SUCCESS:
            return {
                ...state,
                hauntedDestinations: {
                    ...state.hauntedDestinations,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_HAUNTED_FAIL:
            return {
                ...state,
                hauntedDestinations: {
                    ...state.hauntedDestinations,
                    loading: false,
                    error: action.payload
                }
            };
        case GET_DESTINATIONS_BY_AMAZING_REQUEST:
            return {
                ...state,
                amazingDestinations: {
                    ...state.amazingDestinations,
                    loading: true,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_AMAZING_SUCCESS:
            return {
                ...state,
                amazingDestinations: {
                    ...state.amazingDestinations,
                    loading: false,
                    data: action.payload,
                    error: null
                }
            };
        case GET_DESTINATIONS_BY_AMAZING_FAIL:
            return {
                ...state,
                amazingDestinations: {
                    ...state.amazingDestinations,
                    loading: false,
                    error: action.payload
                }
            };
        default:
            return state;
    }
};

export default dashboardReducer;
