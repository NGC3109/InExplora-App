import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchInput from '../ui/TextInputSearch';
import ButtonCustom from '../../components/ui/Button';
import { Alert } from '../ui/Alert';

const GroupTemplate = ({
  continueButton,
  onChangeText,
  textValue,
  messageAlert,
}) => {
  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={onChangeText}
        textValue={textValue}
      />
       {
            messageAlert && <Alert
                              message="Ingrese un destino válido."
                              type="danger"
                              Customstyle={{marginTop: 10}}
                            />
        }
      <View style={{flex: 1}} />
      <ButtonCustom
        title="Continuar"
        onPress={continueButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});

export default GroupTemplate;
