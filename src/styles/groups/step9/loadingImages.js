import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
    },
    center: {
      alignItems: 'center',
    },
    coverLabel: {
      position: 'absolute',
      top: 5,
      left: 5,
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 10
    },
    coverLabelText: {
      color: 'black',
      fontSize: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 8,
      marginBottom: 5,
    },
    counter: {
      fontSize: 16,
      color: 'gray',
      marginBottom: 10
    },
    scrollView: {
      width: '100%', // Asegúrate de que el ScrollView ocupa todo el ancho
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Esto permite el flujo de elementos en formato de cuadrícula
      justifyContent: 'space-between', // Esto agrega espacio entre las imágenes
    },
    imageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '2%', // Espacio entre filas de imágenes
    },
    imageWrapper: {
      position: 'relative',
      width: '48%', // Cada imagen ocupará aproximadamente la mitad del contenedor, menos el espacio entre ellas
      aspectRatio: 1, // Las imágenes serán cuadradas
      marginRight: '2%'
    },
    image: {
      width: '100%',
      height: '100%', // La altura se ajustará al aspectRatio definido en imageWrapper
      borderRadius: 10,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#FFF',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // Aquí debes agregar estilos para tus indicadores de carga
    },
    publishButton: {
      backgroundColor: '#FFF', // Cambiado para contrastar con el texto
      borderRadius: 5,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 0.5,
      marginTop: 'auto', // Asegura que el botón se quede en la parte inferior
      shadowColor: 'black', // Color de la sombra
      shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
      shadowRadius: 2, // Radio de la sombra
      elevation: 8 // Elevación para Android (si es necesario)
    },
    publishButtonText: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
    },
    addMoreButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      height: '100%',
      borderStyle: 'dashed'
    },
    addMoreIcon: {
      fontSize: 24,
      marginBottom: 5
    },
    addMoreText: {
      fontSize: 16
    },
  });