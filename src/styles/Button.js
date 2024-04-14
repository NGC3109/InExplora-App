import { StyleSheet } from 'react-native';
import Config from 'react-native-config';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: Config.COLOR_BLUE_OPACITY,
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 10, // Añade padding horizontal si es necesario.
        borderColor: Config.COLOR_BLUE,
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'center', // Asegúrate de que el botón se centre en la pantalla.
        width: '100%', // Puedes ajustar el ancho del botón si es necesario.
        marginBottom: 30, // Ajusta esto para aumentar el espacio en el fondo.
    },
    buttonText: {
        color: Config.COLOR_BLUE,
        fontSize: 16,
        fontWeight: 'bold'
    },
});