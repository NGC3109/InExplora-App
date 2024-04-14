import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Config from 'react-native-config';

const GroupHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Preparando el viaje</Text>
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
    color: Config.COLOR_BLUE
  },
});

export default GroupHeader;
