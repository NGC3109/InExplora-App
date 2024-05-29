export const initialState = {
    groups: {
        destination: null, // destino
        travelMode: {
            travelMode: null,
            compartirConduccion: false,
        }, // transporte
        accommodation: null, // hospedaje
        numberOfPeople: null, // máximo personas
        minimumAge: null, // edad mínima
        maximumAge: null, // edad máxima
        budget: null, // presupuesto p/p
        travelWithChildren: false, // niños?
        travelWithPets: {
            incluyeMascotas: null,
            petSize: null,
        }, // mascotas?
        description: null, // descripción
        coverPhoto: null, // portada
        gallery: [], // galería
        genre: null,
        startingTravel: {
            startingTravel: null,
            latitude: null,
            longitude: null,
        }, // fecha de partida
    },
    draft: {
        data: null,
        id: null,
        loading: false, 
        error: null
    },
    groupsByUser: {
        loading: false,
        data: null,
        error: null
    },
    allGroups: {
        data: [],
        loading: false,
        error: null
    },
    groupDetails: {
        data: [],
        loading: false,
        error: null,
    },
    requestToJoin: {
        data: [],
        loading: false,
        error: null,
    },
    joinRequests: {
        data: [],
        loading: false,
        error: null,
    },
    sendRequestToJoin: {
        message: null,
    },
    joinRequestState: {
        data: [],
        loading: false,
        error: null,
    },
};
