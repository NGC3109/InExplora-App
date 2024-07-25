import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Select, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ButtonCustom from '../../../../components/ui/Button';
import ButtonWithIcon from '../../../../components/ui/ButtonWithIcon';

function UpdateProfile_Information() {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <View style={styles.profileDetails}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Número teléfonico</Text>
            </View>
            <View style={styles.sectionContent}>
              <Input
                w="100%"
                placeholder="+56 9 3870 7436"
                keyboardType="phone-pad"
                value='+56 9 3870 7436'
              />
            </View>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Email</Text>
            </View>
            <View style={styles.sectionContent}>
              <Input
                w="100%"
                placeholder="undatorres1994@gmail.com"
                keyboardType="email-address"
                value='undatorres1994@gmail.com'
              />
            </View>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>País</Text>
            </View>
            <View style={styles.sectionContent}>
              <Select
                w="100%"
                placeholder="Seleccionar país"
                _selectedItem={{
                  bg: "cyan.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                <Select.Item label="Chile" value="Chile" />
                <Select.Item label="Argentina" value="Argentina" />
                <Select.Item label="Perú" value="Perú" />
                <Select.Item label="Brasil" value="Brasil" />
                <Select.Item label="México" value="México" />
              </Select>
            </View>
          </View>
          <View style={styles.separator} />
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Género</Text>
            </View>
            <View style={styles.sectionContent}>
              <Select
                w="100%"
                placeholder="Seleccionar género"
                _selectedItem={{
                  bg: "cyan.600",
                  endIcon: <CheckIcon size="5" />,
                }}
              >
                <Select.Item label="Hombre" value="Hombre" />
                <Select.Item label="Mujer" value="Mujer" />
                <Select.Item label="Otro" value="Otro" />
              </Select>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
       <View style={{paddingHorizontal: 10}}>
        <ButtonWithIcon handleClick={() => {}} title="Guardar" width="100%" height={50} />
       </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileDetails: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#021121',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    width: '100%',
  },
  separator: {
    height: 1.5,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '100%',
  },
});

export default UpdateProfile_Information;
