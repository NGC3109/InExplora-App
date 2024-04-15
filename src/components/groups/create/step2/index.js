import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox, NativeBaseProvider, Select } from 'native-base';
import { styles } from '../../../../styles/groups/step2';
import ButtonCustom from '../../../ui/Button';
import { Alert } from '../../../ui/Alert';

const P2_TravelMode_Template = ({ 
  transporte,
  handleTransporteChange,
  continueButton,
  mostrarCheckbox,
  compartirConduccion,
  setCompartirConduccion,
  messageAlert,
 }) => {

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Select
          selectedValue={transporte}
          minWidth={200}
          accessibilityLabel="Seleccione un transporte"
          placeholder="Seleccione un transporte"
          _selectedItem={{
            bg: 'rgba(57, 103, 176, 0.4)',
          }}
          mt={1}
          onValueChange={itemValue => handleTransporteChange(itemValue)}
        >
            <Select.Item label="Avión" value="avion" />
            <Select.Item label="Auto particular" value="autoParticular" />
            <Select.Item label="Bus" value="bus" />
            <Select.Item label="Mochileo" value="mochileo" />
            <Select.Item label="Moto" value="moto" />
            <Select.Item label="Arriendo de vehículo" value="arriendoVehiculo" />
          </Select>
        <Text style={styles.infoText}>¿Cómo prefieren viajar?</Text>
        {
            messageAlert ? 
                <>
                    <Alert
                        message="Ingresa alguna opción de transporte."
                        type="danger"
                    />
                </>
            : 
                <>
                    <Text style={styles.helperText}>
                        Seleccionen el medio de transporte para su viaje.
                    </Text>
                </>
        }
        {mostrarCheckbox && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              isChecked={compartirConduccion}
              onChange={setCompartirConduccion}
              value="compartir"
              accessibilityLabel="Compartir conducción"
            />
            <Text style={styles.checkboxLabel}>¿Es importante para ustedes que todas las personas cuenten con licencia de conducción válida para compartir el volante?</Text>
          </View>
        )}
        <View style={{ flex: 1 }} />
        <ButtonCustom
          title="Continuar"
          onPress={() => continueButton()}
        />
      </View>
    </NativeBaseProvider>
  );
};



export default P2_TravelMode_Template;
