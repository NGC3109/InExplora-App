export const initialState = {
    groups: {
        destination: null, //destino
        travelMode: null, //transporte
        accommodation: null, //hospedaje
        numberOfPeople: null, //maximo personas
        minimumAge: null, //edad minima
        maximumAge: null, //edad maxima
        budget: null, //presupuesto p/p
        travelWithChildren: false, //niños?
        travelWithPets: false, //mascotas?
        description: null, //descripcion
        coverPhoto: null, //portada
        gallery: [], //galeria
        placeData: {
            formatted_address: null,
            name: null,
            photos: [],
            rating: null
        }
    },
};