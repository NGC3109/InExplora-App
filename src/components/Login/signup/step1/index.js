import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { Input, NativeBaseProvider } from 'native-base';
const P1_signUp_Template = ({
    continueButton,
    handleDisplayNameChange,
    messageAlert,
    displayName,
 }) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
            <Text style={styles.subtitle}>Como te llamas?</Text>
            <Text style={styles.description}>
                Escribe tu nombre, asi los demas usuarios podran conocerte.
            </Text>
            <Input 
                value={displayName}
                onChangeText={handleDisplayNameChange}
            />
            <View>
            {
                messageAlert &&
                    <Alert
                        message="Ingresa algún nombre."
                        type="danger"
                        Customstyle={{marginTop: 5}}
                    />
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

export default P1_signUp_Template;
