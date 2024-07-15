import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../../styles/groups/step3';
import { Alert } from '../../../ui/Alert';
import ButtonCustom from '../../../ui/Button';
import { Select, CheckIcon, NativeBaseProvider } from 'native-base';
const P2_signUp_Template = ({
    continueButton,
    handleGenreChange,
    messageAlert,
    genre,
 }) => {
  return (
    <NativeBaseProvider>
        <View style={styles.container}>
            <Text style={styles.subtitle}>Cual es tu genero?</Text>
            <Text style={styles.description}>
                De esta forma podremos brindarte una experiencia mas personalizada.
            </Text>
            <Select
                selectedValue={genre}
                minWidth="50"
                accessibilityLabel="Cual es tu genero?"
                placeholder="Cual es tu genero?"
                _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="1" />
                }}
                onValueChange={handleGenreChange}
            >
                <Select.Item key="1" label="Mujer" value="Mujer" />
                <Select.Item key="2" label="Hombre" value="Hombre" />
            </Select>
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
