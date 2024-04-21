import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // O el color de fondo de tu aplicación
      },
      powerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc', // O el color que prefieras para el borde
        backgroundColor: '#f7f7f7', // Un color de fondo ligeramente diferente para resaltar el elemento
      },
      powerDescription: {
        flex: 1,
        marginRight: 10, // Espacio entre el texto y el switch
      },
      powerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5, // Espacio entre el título y la descripción
      },
      powerSubTitle: {
        fontSize: 14,
        color: '#555', // Un color de texto más suave para la descripción
      },
      caracteresLimit: {
        textAlign: 'right',
        fontSize: 12,
        color: '#999', // Un color de texto más suave para el límite de caracteres
        marginVertical: 5, // Espacio arriba y abajo del texto de límite de caracteres
      },
      helperText: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20, // Espacio antes del botón de continuar
      },
});