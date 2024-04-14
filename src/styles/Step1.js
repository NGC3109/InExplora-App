import { StyleSheet } from 'react-native';
import Config from 'react-native-config';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
    },
    imageStyle: {
      borderRadius: 30,
      marginTop: 20, // Espacio arriba de la imagen
      alignSelf: 'center', // Centrar la imagen horizontalmente
    },
    description: {
      color: Config.COLOR_LABEL,
      marginTop: 20, // Espacio arriba del texto
      textAlign: 'left', // Centrar el texto
    },
    separator: {
      borderWidth: 0.5,
      borderColor: Config.COLOR_LABEL,
      marginVertical: 20, // Espacio vertical arriba y debajo del separador
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoBlock: {
      width: '50%',
      paddingHorizontal: 10, // Espacio horizontal para los bloques de información
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10, // Espacio debajo de cada item de información
    },
    infoContent: {
      marginLeft: 10, // Espacio entre el icono y el texto
    },
    infoTitle: {
      fontSize: 12,
      color: Config.COLOR_LABEL,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    infoText: {
      fontSize: 16,
      color: Config.COLOR_LABEL,
    },
  });