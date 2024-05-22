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
  handleChangeCompartir,
  messageAlert,
  transports,
}) => {

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Selecciona tu estilo de viaje</Text>
        <Text style={styles.description}>
          Elige cómo quieres explorar el mundo. Cada modo de transporte abre nuevas posibilidades y aventuras. ¿Listos para arrancar?
        </Text>
        <View>
          <Select
            selectedValue={transporte.travelMode}
            minWidth={200}
            accessibilityLabel="Seleccione un transporte"
            placeholder="Seleccione un transporte"
            _selectedItem={{
              bg: 'rgba(57, 103, 176, 0.4)',
            }}
            mt={1}
            onValueChange={itemValue => handleTransporteChange(itemValue)}
          >
            {transports && transports.map(transport => (
              <Select.Item 
                key={transport.value} 
                label={transport.name} 
                value={transport.value} 
              />
            ))}
          </Select>
          <Text style={styles.infoText}>¿Cómo prefieren viajar?</Text>
        </View>
        {
          messageAlert ? 
            <Alert
              message="Ingresa alguna opción de transporte."
              type="danger"
              Customstyle={{ marginTop: 5 }}
            />
          : 
            <Text style={styles.helperText}>
              Seleccionen el medio de transporte para su viaje.
            </Text>
        }
        {mostrarCheckbox && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              isChecked={compartirConduccion}
              onChange={() => handleChangeCompartir(!compartirConduccion)}
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
