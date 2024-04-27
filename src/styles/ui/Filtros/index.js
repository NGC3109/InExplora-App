import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%'
    },
    fab: {
        zIndex: 1,
        position: 'absolute',
        width: 56, // Tamaño estándar para un FAB
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16, // Espaciado estándar desde el borde derecho
        bottom: 16, // Espaciado desde el borde inferior
        backgroundColor: '#021121', // Un color azul Material Design
        borderRadius: 28, // La mitad del tamaño del FAB para hacerlo un círculo perfecto
        elevation: 6, // Elevación para sombra en Android
        shadowColor: '#000000', // Sombras para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.25,
    },
    fabIcon: {
        fontSize: 24,
        color: 'white',
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'black',
        fontWeight: '500'
    },
    textCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    transportButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginVertical: 10,
        marginBottom: 35
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    slider: {
        width: '100%',
        // Estilo adicional si es necesario
    },
    sliderValueText: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'black',
        fontWeight: '500'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    buttonText: {
        color: '#000',  
        fontWeight: '500'
    },
    checkboxGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    buttonsContainer: {
        backgroundColor: '#ffffff',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 10,
        marginRight: 5
    },
    buttonsSelected: {
        backgroundColor: '#021121', // o cualquier color que represente la selección
    },
    buttonsTextSelected: {
        color: '#fff',
    },
});