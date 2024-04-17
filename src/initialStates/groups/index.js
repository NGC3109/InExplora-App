export const initialState = {
    groups: {
        destination: null, //destino
        travelMode: {
            travelMode: null,
            compartirConduccion: false,
        }, //transporte
        accommodation: null, //hospedaje
        numberOfPeople: null, //maximo personas
        minimumAge: null, //edad minima
        maximumAge: null, //edad maxima
        budget: null, //presupuesto p/p
        travelWithChildren: false, //niños?
        travelWithPets: {
            incluyeMascotas: null,
            petSize: null,
        }, //mascotas?
        description: null, //descripcion
        coverPhoto: null, //portada
        gallery: [], //galeria
        genre: null,
        startingTravel: {
            startingTravel: null,
            latitude: null,
            longitude: null,
        }, // fecha de partida
    },
};