import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { Input, NativeBaseProvider } from 'native-base';
const P3_signUp_Template = ({
    continueButton,
    handleDisplayNameChange,
    messageAlert,
    displayName,
 }) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
            <Text style={styles.subtitle}>Cual es tu fecha de nacimiento?</Text>
            <Text style={styles.description}>
                Escribe tu fecha de nacimiento, asi los demas usuarios podran saber más de ti.
            </Text>
            <Input 
                value={displayName}
                onChangeText={handleDisplayNameChange}
            />
            <View>
            {
                messageAlert &&
                    <Alert
                        message="Ingresa alguna fecha."
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

export default P3_signUp_Template;
