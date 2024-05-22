import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select } from 'native-base';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';

const P3_Accommodation_Template = ({ 
    continueButton,
    handleHotelsChange,
    messageAlert,
    hotels,
    accommodations,
 }) => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Define tu espacio en el mundo</Text>
        <Text style={styles.description}>
          Elige tu alojamiento ideal. ¡Prepara el escenario para una aventura memorable!
        </Text>
        <View>
          <Select
            selectedValue={hotels}
            minWidth={200}
            accessibilityLabel="Seleccione un alojamiento"
            placeholder="Seleccione un alojamiento"
            _selectedItem={{
              bg: 'rgba(57, 103, 176, 0.4)',
            }}
            mt={1}
            onValueChange={itemValue => handleHotelsChange(itemValue)}
          >
            {accommodations && accommodations.map((accommodation) => (
              <Select.Item 
                key={accommodation.value} 
                label={accommodation.name} 
                value={accommodation.value} 
              />
            ))}
          </Select>
          <Text style={styles.infoText}>¿Qué tipo de alojamiento prefieren?</Text>
          {
            messageAlert ? 
                <Alert
                    message="Ingresa alguna opción de alojamiento."
                    type="danger"
                    Customstyle={{marginTop: 5}}
                />
            : 
                <Text style={styles.helperText}>
                  Elijan dónde les gustaría alojarse, como en una casa, cabaña, hotel, camping, etc.
                </Text>
          }
        </View>
        <View style={{ flex: 1 }} />
        <ButtonCustom 
          onPress={continueButton}
          title="Continuar"
        />
      </View>
    </NativeBaseProvider>
  );
};

export default P3_Accommodation_Template;
