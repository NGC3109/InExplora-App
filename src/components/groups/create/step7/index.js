import React from 'react';
import { View, Text } from 'react-native';
import { Alert } from '../../../ui/Alert';
import { styles } from '../../../../styles/groups/step7';
import { NativeBaseProvider, Select } from 'native-base';
import ButtonCustom from '../../../ui/Button';

const P7_GroupTravelWithPets_Template = ({ 
    continueButton,
    handleIncluyeMascotasChange,
    incluyeMascotas,
    tamanoMascota,
    setTamanoMascota,
    messageAlert,
}) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
        <View>
            <Select
                selectedValue={incluyeMascotas}
                minWidth={200}
                accessibilityLabel="Seleccione una respuesta"
                placeholder="Seleccione una respuesta"
                _selectedItem={{
                    bg: 'rgba(57, 103, 176, 0.4)',
                }}
                mt={1}
                onValueChange={itemValue => handleIncluyeMascotasChange(itemValue)}
            >
                <Select.Item label="No" value="no" />
                <Select.Item label="Sí" value="si" />
            </Select>
            <Text style={styles.infoText}>¿Incluirán mascotas en su viaje?</Text>
            <Text style={styles.helperText}>
            Seleccionen si viajarán con mascotas.
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
            {incluyeMascotas === 'si' && (
            <View>
                <Text style={styles.label}>¿De qué tamaño es su mascota más grande?</Text>            
                <Select
                    selectedValue={tamanoMascota}
                    minWidth={200}
                    accessibilityLabel="Seleccione una respuesta"
                    placeholder="Seleccione una respuesta"
                    _selectedItem={{
                        bg: 'rgba(57, 103, 176, 0.4)',
                    }}
                    mt={1}
                    onValueChange={itemValue => setTamanoMascota(itemValue)}
                >
                    <Select.Item label="Pequeño" value="Pequeño" />
                    <Select.Item label="Mediano" value="Mediano" />
                    <Select.Item label="Grande" value="Grande" />
                    <Select.Item label="Extra Grande" value="Extra Grande" />
                </Select>
                <Text style={styles.helperText}>
                Si viaja con más de una mascota, seleccione el tamaño de su mascota más grande.
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
export default P7_GroupTravelWithPets_Template;
