import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    exploreMoreHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    exploreMoreTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    seeAllButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ff3b30',
    },
    exploreCard: {
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 20,
    },
    exploreCardImage: {
      width: '100%',
      height: 150, // Ajustar según tu diseño
      resizeMode: 'cover',
    },
    exploreCardBody: {
      padding: 10,
    },
    explorePlaceName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    explorePlaceDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userLikesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    avatarImage: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 5,
    },
    likesCount: {
      fontSize: 12,
      color: '#666',
    },
    placesList: {
      marginVertical: 15,
      // Asegúrate de que haya suficiente espacio alrededor de la FlatList para las sombras
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 15, // Esquinas redondeadas
      overflow: 'hidden',
      marginRight: 15, // Espacio entre tarjetas
      width: 155, // También puedes ajustar el ancho aquí si es necesario
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      shadowOpacity: 0.1, // La opacidad de la sombra
      elevation: 6, // La elevación para Android para la sombra
      marginBottom: 20, // Espacio debajo de cada tarjeta para la sombra
      marginLeft: 5
    },
    cardImage: {
      width: '100%', // Ancho relativo al contenedor
      height: 150, // Altura fija para las imágenes
      resizeMode: 'cover',
      borderTopLeftRadius: 15, // Redondear solo las esquinas superiores
      borderTopRightRadius: 15,
    },
    cardContent: {
      padding: 10,
    },
    placeName: {
      fontWeight: 'bold',
    },
    placeMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
    },
    placeCountry: {
      fontStyle: 'italic',
    },
    ratingContainer: {
      backgroundColor: 'gold',
      borderRadius: 5,
      padding: 3,
    },
    placeRating: {
      fontWeight: 'bold',
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      padding: 1,
      backgroundColor: '#f2f2f2',
      color: '#424242',
    },
    categoriesSection: {
      // If you need any specific style for this section
    },
    categoriesTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
    },
    categoriesList: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    categoryButton: {
      backgroundColor: '#eaeaea',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginHorizontal: 5,
    },
    activeCategory: {
      backgroundColor: '#ff3b30',
    },
    categoryText: {
      color: '#000',
    },
  });