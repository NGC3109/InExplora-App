import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step6';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { NativeBaseProvider, Select } from 'native-base';

const P6_GroupTravelWithChildren_Template = ({
    incluyeMenores,
    edadMayorMenor,
    setEdadMayorMenor,
    handleIncluyeMenoresChange,
    continueButton,
    messageAlert,
 }) => {
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <View>
        <Select
            selectedValue={incluyeMenores}
            minWidth={200}
            accessibilityLabel="Seleccione una respuesta"
            placeholder="Seleccione una respuesta"
            _selectedItem={{
                bg: 'rgba(57, 103, 176, 0.4)',
            }}
            mt={1}
            onValueChange={itemValue => handleIncluyeMenoresChange(itemValue)}
        >
            <Select.Item label="No" value="no" />
            <Select.Item label="Sí" value="si" />
        </Select>
        <Text style={styles.infoText}>¿Incluirán niñas/niños/adolescentes en su viaje?</Text>
        <Text style={styles.helperText}>
          Seleccionen si viajarán con niñas/niños/adolescentes.
        </Text>
        
        {
            messageAlert &&
                <>
                    <Alert
                        message="Ingresa una respuesta."
                        type="danger"
                        Customstyle={{marginTop: 5}}
                    />
                </>
        }
        {incluyeMenores === 'si' && (
          <View>
            <Text style={styles.label}>¿Que edad tiene?</Text>            
            <Select
                selectedValue={edadMayorMenor}
                minWidth={200}
                accessibilityLabel="Seleccione una respuesta"
                placeholder="Seleccione una respuesta"
                _selectedItem={{
                    bg: 'rgba(57, 103, 176, 0.4)',
                }}
                mt={1}
                onValueChange={itemValue => setEdadMayorMenor(itemValue)}
            >
                {Array.from({ length: 18 }, (_, i) => i).map(value => (
                  <Select.Item key={value} label={`${value} años`} value={value} />
                ))}
            </Select>
            <Text style={styles.helperText}>
              Si viaja con más de uno, seleccione la edad del o la mayor.
            </Text>
          </View>
        )}
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


export default P6_GroupTravelWithChildren_Template;
