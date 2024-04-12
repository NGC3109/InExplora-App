import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

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
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default GroupHeader;
