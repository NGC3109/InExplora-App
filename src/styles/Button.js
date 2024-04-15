import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 10, // Añade padding horizontal si es necesario.
        borderColor: 'black',
        borderWidth: 0.5,
        alignItems: 'center',
        alignSelf: 'center', // Asegúrate de que el botón se centre en la pantalla.
        width: '100%', // Puedes ajustar el ancho del botón si es necesario.
        marginBottom: 30, // Ajusta esto para aumentar el espacio en el fondo.
        shadowColor: 'black', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (horizontal, vertical)
        shadowRadius: 2, // Radio de la sombra
        elevation: 8 // Elevación para Android (si es necesario)
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
});