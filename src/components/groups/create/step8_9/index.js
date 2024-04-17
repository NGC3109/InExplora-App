import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import MoneyInput from '../../../ui/TextInputSearch';

const P8_9_Budget_Template = ({ 
    continueButton,
    handleBudgetsChange,
    messageAlert,
    budget,
 }) => {
  return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Define el costo de tu Aventura</Text>
        <Text style={styles.description}>
          Ingresa un presupuesto aproximado que necesitaran las personas que quieren unirse a tu viaje.
        </Text>
        <MoneyInput 
          onChangeText={handleBudgetsChange}
          textValue={budget}
        />
        <View>
          {
            messageAlert &&
                <>
                    <Alert
                        message="Ingresa algún presupuesto aproximado."
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
  );
};

export default P8_9_Budget_Template;
