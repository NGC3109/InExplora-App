import { StyleSheet } from 'react-native';
export const dataImg =
    [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ]

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 5,
    },
    profileContainer: {
      marginBottom: 10,
    },
    profileDescription: {
      fontSize: 16,
      textAlign: 'left',
      marginBottom: 10,
    },
    inputsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    selectContainer: {
      flex: 1,
      marginRight: 5,
    },
    inputContainer: {
      flex: 1,
      marginRight: 5,
    },
    applyButton: {
      backgroundColor: 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    applyButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    tabContent: {
      flex: 1,
    },
    gridItem: {
      flex: 1,
      margin: 1,
    },
    image: {
      flex: 1,
      height: 100,
      resizeMode: 'cover',
    },
    filterButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    filterButtonText: {
      color: 'black',
    },
    filtersContainer: {
      marginTop: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        marginBottom: 5,
      },
    filterColumn: {
        flex: 1,
        paddingHorizontal: 2,
    },
  });

  export const filters = [
    { 
      id: "ageRange", 
      title: "Rango de Edad", 
      values: ["Seleccionar","18-30", "31-45", "46-60", "Más de 60"]
    },
    { 
      id: "pets", 
      title: "Mascotas",
      values: ["Seleccionar","Con mascotas", "Sin mascotas"]
    },
    { 
      id: "children", 
      title: "Hijos", 
      values: ["Seleccionar","Con hijos", "Sin hijos"]
    },
    { 
      id: "women", 
      title: "Mujeres", 
      values: ["Seleccionar","Solo mujeres"]
    },
    { 
      id: "men", 
      title: "Hombres", 
      values: ["Seleccionar","Solo hombres"]
    },
    { 
      id: "mixedGender", 
      title: "Género Mixto", 
      values: ["Seleccionar", "Mujeres y Hombres"]
    }
  ];