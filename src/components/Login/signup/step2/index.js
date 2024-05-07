import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { Input, NativeBaseProvider } from 'native-base';
const P2_signUp_Template = ({
    continueButton,
    handleDisplayNameChange,
    messageAlert,
    displayName,
 }) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
            <Text style={styles.subtitle}>Cual es tu genero?</Text>
            <Text style={styles.description}>
                De esta forma podremos brindarte una experiencia mas personalizada.
            </Text>
            <Input 
                value={displayName}
                onChangeText={handleDisplayNameChange}
            />
            <View>
            {
                messageAlert &&
                    <Alert
                        message="Ingresa algún genero."
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

export default P2_signUp_Template;
