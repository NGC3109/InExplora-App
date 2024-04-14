import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchInput from '../ui/TextInputSearch';
import ButtonCustom from '../../components/ui/Button';

const GroupTemplate = ({
  continueButton,
  onChangeText,
  textValue,
}) => {
  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={onChangeText}
        textValue={textValue}
      />
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
  },
});

export default GroupTemplate;
