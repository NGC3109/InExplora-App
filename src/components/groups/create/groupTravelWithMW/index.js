import React from 'react';
import { View, Text } from 'react-native';
import { NativeBaseProvider, Select } from 'native-base';
import ButtonCustom from '../../../ui/Button';
import { Alert } from '../../../ui/Alert';
import { styles } from '../../../../styles/groups/step6';
import ButtonWithIcon from '../../../ui/ButtonWithIcon';

const P1_GroupTravelWith_Women_Men_Template = ({
    generoViaje,
    handleGeneroChange,
    continueButton,
    messageAlert,
 }) => {
  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      <Text style={styles.subtitle}>Elige tu compañía de viaje ideal</Text>
      <Text style={styles.description}>
      Decide si deseas compartir esta aventura con mujeres, hombres o ambos. ¡Crea recuerdos inolvidables con la compañía perfecta!
      </Text>
      <View>
        <Select
            selectedValue={generoViaje}
            minWidth={200}
            accessibilityLabel="Seleccione una respuesta"
            placeholder="Seleccione una respuesta"
            _selectedItem={{
                bg: 'rgba(57, 103, 176, 0.4)',
            }}
            mt={1}
            onValueChange={itemValue => handleGeneroChange(itemValue)}
        >
            <Select.Item label="Hombres y mujeres" value="Hombres y mujeres" />
            <Select.Item label="Solo mujeres" value="Solo mujeres" />
            <Select.Item label="Solo hombres" value="Solo hombres" />
        </Select>
        <Text style={styles.infoText}>¿Con quienes le gustaria realizar su viaje?</Text>
        <Text style={styles.helperText}>
          Seleccionen si viajarán con mujeres, hombres o ambos.
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


export default P1_GroupTravelWith_Women_Men_Template;
