import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select } from 'native-base';
import { Alert } from '../../../ui/Alert';
import { styles } from '../../../../styles/groups/step4';
import ButtonCustom from '../../../ui/Button';

const P4_GroupSize_Template = ({
    groupSize,
    messageAlert,
    continueButton,
    handleChangeSize,
}) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
        <View>
            <Select
                selectedValue={groupSize}
                minWidth={200}
                accessibilityLabel="Seleccione un número de personas"
                placeholder="Seleccione un alojamiento"
                _selectedItem={{
                bg: 'rgba(57, 103, 176, 0.4)',
                }}
                mt={1}
                onValueChange={itemValue => handleChangeSize(itemValue)}
            >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
                    <Select.Item key={value} label={`${value}`} value={value} />
                ))}
            </Select>
            <Text style={styles.infoText}>¿De cuantas personas será su grupo de viaje?</Text>
            {
                messageAlert &&
                    <>
                        <Alert
                            message="Ingresa algun número de personas que quieres que viajen contigo."
                            type="danger"
                            Customstyle={{marginTop: 5}}
                        />
                    </>
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



export default P4_GroupSize_Template;
