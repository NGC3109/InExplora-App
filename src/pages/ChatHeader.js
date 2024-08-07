import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

const ChatHeader = ({ name, avatar }) => (
    <View style={styles.header}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.headerText}>{name}</Text>
    </View>
  );

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111b21'
  },
});

export default ChatHeader;
