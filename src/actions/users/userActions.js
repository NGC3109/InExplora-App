import axios from 'axios';
import Config from 'react-native-config';

export const saveUser = (userData) => {
  return async (dispatch) => {
    try {
      // URL de tu API para crear usuarios
      const apiUrl = `${Config.API_ENDPOINT}users/${userData.email}`;
      // Enviar la solicitud al backend para crear el usuario
      const { data } = await axios.get(apiUrl, userData);
      // Verificar la respuesta del backend
      if (data) {
        // Usuario creado exitosamente, guardar en el store
        dispatch({
          type: 'SAVE_USER',
          payload: data,
        });
      } else {
        // Manejar respuesta no exitosa, según sea necesario
        console.error('Error en la creación del usuario en el backend');
      }
    } catch (error) {
      // Manejar errores de conexión o del servidor
      console.error('Error al crear el usuario en el backend:', error);
    }
  };
};