import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ButtonCustom from '../../../ui/Button';
// import { styles } from '../../../../styles/groups/join/step2';

const powers = [
  { id: 1, title: 'Traductor Universal', description: 'Traduce cualquier idioma, si no sabe lo inventa.' },
  { id: 2, title: 'Super Agilidad para Reservas', description: 'Reserva muy rápido. Si es necesario acude a la violencia.' },
  { id: 3, title: 'Visión de Rayos X de Ofertas', description: 'Consigue todo a precio rata.' },
  { id: 4, title: 'Multiplicación del Presupuesto', description: 'Gastos que se reducen mágicamente.' },
];

const Join_P2_Template = ({
  continueButton, 
  superpower,
  messageAlert,
  toggleSwitch,
}) => {

  return (
    <View style={styles.container}>
      {powers.map(power => (
        <TouchableOpacity
          key={power.id}
          style={styles.powerItem}
          onPress={() => toggleSwitch(power.id, power.title)}
        >
           <Image
            source={require('../../../../assets/check.jpg')} // Asegúrate de que la ruta de la imagen sea correcta
            style={styles.circleIcon}
          />
          <View style={styles.powerDescription}>
            <Text style={styles.powerTitle}>{power.title}</Text>
            <Text style={styles.powerSubTitle}>{power.description}</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={superpower[power.id]?.enabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(power.id, power.title)}
            value={superpower[power.id]?.enabled || false}
          />
        </TouchableOpacity>
      ))}
      <View style={{ flex: 1 }} />
      <ButtonCustom
        onPress={continueButton}
        title="Enviar solicitud"
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
      paddingHorizontal: 10,
      marginVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc', // O el color que prefieras para el borde
      backgroundColor: '#f7f7f7', // Un color de fondo ligeramente diferente para resaltar el elemento
    },
    circleIcon: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 30,
      // ... otros estilos que necesites para la imagen circular
    },
    powerDescription: {
      flex: 1,
      marginRight: 5, // Espacio entre el texto y el switch
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
export default Join_P2_Template;
