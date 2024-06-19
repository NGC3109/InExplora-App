import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../../styles/groups/step5';
import { NativeBaseProvider, Select } from 'native-base';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import ButtonWithIcon from '../../../ui/ButtonWithIcon';

const P5_GroupMinMax_Template = ({
    updateMinGroupSize,
    minGroupSize,
    maxGroupSize,
    handleMaxSize,
    continueButton,
    messageAlert
}) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
            <Text style={styles.subtitle}>Afinando la sintonía del grupo</Text>
            <Text style={styles.description}>
            Selecciona rangos de edad compatibles para viajar con quienes compartan tus intereses y estilo. ¡Viaja a tu medida!</Text>
            <View>
                <Text style={styles.helperText}>Edad mínima:</Text>
                <Select
                    selectedValue={minGroupSize}
                    minWidth={200}
                    accessibilityLabel="Seleccione una edad minima"
                    placeholder="Seleccione una edad minima"
                    _selectedItem={{
                        bg: 'rgba(57, 103, 176, 0.4)',
                    }}
                    mt={1}
                    onValueChange={itemValue => updateMinGroupSize(itemValue)}
                >
                    <Select.Item label="Seleccione una edad mínima" value="0" />
                    {Array.from({ length: (60 - 18 + 1) }, (_, i) => i + 18).map(value => (
                        <Select.Item key={value} label={`${value}`} value={value} />
                    ))}
                </Select>
                <Text style={styles.helperText}>Edad máxima:</Text>
                <Select
                    selectedValue={maxGroupSize}
                    minWidth={200}
                    accessibilityLabel="Seleccione un número de personas"
                    placeholder="Seleccione una edad maxima"
                    _selectedItem={{
                        bg: 'rgba(57, 103, 176, 0.4)',
                    }}
                    mt={1}
                    onValueChange={itemValue => handleMaxSize(itemValue)}
                > 
                    <Select.Item label="Seleccione una edad maxima" value="0" />
                    {Array.from({ length: 60 - minGroupSize + 1 }, (_, i) => i + minGroupSize).map(value => (
                        <Select.Item key={value} label={`${value}`} value={value} />
                    ))}
                </Select>
                {
                    messageAlert &&
                        <>
                            <Alert
                                message="Ingresa rangos de edad."
                                type="danger"
                                Customstyle={{marginTop: 5}}
                            />
                        </>
                }
            </View>
        <View style={{ flex: 1 }} />
            <ButtonWithIcon 
                handleClick={continueButton}
                title="Continuar"
                width='100%'
            />
        </View>
    </NativeBaseProvider>
  );
};


export default P5_GroupMinMax_Template;
