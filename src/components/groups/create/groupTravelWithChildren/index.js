import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step6';
import ButtonCustom from '../../../ui/Button';
import { NativeBaseProvider, Select } from 'native-base';
import ButtonWithIcon from '../../../ui/ButtonWithIcon';

const P6_GroupTravelWithChildren_Template = ({
    incluyeMenores,
    edadMayorMenor,
    setEdadMayorMenor,
    handleIncluyeMenoresChange,
    incluyeNinosConNecesidadesEspeciales,
    setIncluyeNinosConNecesidadesEspeciales,
    continueButton,
 }) => {
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <Text style={styles.subtitle}>¿Prefieres viajar con o sin menores?</Text>
      <Text style={styles.description}>
        Decidan si incluirán menores en su grupo de viaje para conectar con otras familias. Viajar juntos ofrece una experiencia más segura y enriquecedora para los pequeños.
      </Text>
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
            <Select.Item label="No" value={0} />
            <Select.Item label="Sí" value={1} />
        </Select>
        <Text style={styles.infoText}>¿Incluirán menores en su viaje?</Text>
        <Text style={styles.helperText}>
          Seleccionen si viajarán con menores.
        </Text>
        {incluyeMenores === 1 && (
          <View>
            <Text style={styles.label}>¿Necesidades de atención especial?</Text>
            <Select
                selectedValue={incluyeNinosConNecesidadesEspeciales}
                minWidth={200}
                accessibilityLabel="Seleccione una respuesta"
                placeholder="Seleccione una respuesta"
                _selectedItem={{
                    bg: 'rgba(57, 103, 176, 0.4)',
                }}
                mt={1}
                onValueChange={itemValue => setIncluyeNinosConNecesidadesEspeciales(itemValue)}
            >
                <Select.Item label="No" value={0} />
                <Select.Item label="Sí" value={1} />
            </Select>
            <Text style={styles.helperText}>
              Indiquen si algunos de los menores tienen necesidades de atención especial.
            </Text>
          </View>
        )}
        {/* {incluyeMenores === 'si' && (
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
        )} */}
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

export default P6_GroupTravelWithChildren_Template;
