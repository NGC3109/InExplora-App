import { StyleSheet } from "react-native";
import Config from 'react-native-config';

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    infoText: {
      position: 'absolute',
      top: 10,
      left: 20, // Ajusta según necesidades
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      fontSize: 12,
      color: Config.COLOR_LABEL,
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: Config.COLOR_LABEL,
      borderRadius: 5,
      paddingLeft: 10,
      marginTop: 20, // Ajusta para posicionar el texto correctamente
    },
    searchIcon: {
      paddingRight: 10,
    },
    input: {
      flex: 1,
      height: 50, // Altura del TextInput
      fontSize: 16,
    },
  });