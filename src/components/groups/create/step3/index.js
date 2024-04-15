import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select } from 'native-base';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';

const P3_Accommodation_Template = ({ 
    continueButton,
    handleHotelsChange,
    messageAlert,
    hotels,
 }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View>
          <Select
            selectedValue={hotels}
            minWidth={200}
            accessibilityLabel="Seleccione un transporte"
            placeholder="Seleccione un alojamiento"
            _selectedItem={{
              bg: 'rgba(57, 103, 176, 0.4)',
            }}
            mt={1}
            onValueChange={itemValue => handleHotelsChange(itemValue)}
          >
              <Select.Item label="Hotel" value="hotel" />
              <Select.Item label="Hostal" value="hostal" />
              <Select.Item label="Apartamento turístico" value="apartamentoTuristico" />
              <Select.Item label="Bed and Breakfast (B&B)" value="bedAndBreakfast" />
              <Select.Item label="Casa rural" value="casaRural" />
              <Select.Item label="Casa de huéspedes" value="casaDeHuespedes" />
              <Select.Item label="Resort" value="resort" />
              <Select.Item label="Albergue juvenil" value="albergueJuvenil" />
              <Select.Item label="Camping" value="camping" />
              <Select.Item label="Alojamiento de uso compartido" value="alojamientoCompartido" />
              <Select.Item label="Motel" value="motel" />
              <Select.Item label="Posada" value="posada" />
              <Select.Item label="Cabaña o chalet" value="cabanaChalet" />
              <Select.Item label="Apartahotel" value="apartahotel" />
              <Select.Item label="Casa flotante" value="casaFlotante" />
              <Select.Item label="Ecoalojamiento" value="ecoalojamiento" />
            </Select>
          <Text style={styles.infoText}>¿Qué tipo de alojamiento prefieren?</Text>
          {
            messageAlert ? 
                <>
                    <Alert
                        message="Ingresa alguna opción de alojamiento."
                        type="danger"
                        Customstyle={{marginTop: 5}}
                    />
                </>
            : 
                <>
                    <Text style={styles.helperText}>
                      Elijan dónde les gustaría alojarse, como en una casa, cabaña, hotel, camping, etc.
                    </Text>
                </>
        }
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.button} onPress={() => continueButton()}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};

export default P3_Accommodation_Template;
