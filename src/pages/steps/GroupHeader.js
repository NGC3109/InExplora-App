import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Config from 'react-native-config';

const GroupHeader = ({ step }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Preparando el viaje {step}/12</Text>
    </View>
  );

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black'
  },
});

export default GroupHeader;
