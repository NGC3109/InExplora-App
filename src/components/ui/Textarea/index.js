import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextArea = ({ placeholder, value, initialHeight = 60, onChangeText, style }) => {
  const [height, setHeight] = useState(initialHeight);
  return (
    <TextInput
      style={[styles.input, style, { height: Math.max(initialHeight, height) }]}
      placeholder={placeholder}
      multiline
      value={value}
      onChangeText={onChangeText}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height); // Actualizar la altura según el contenido
      }}
      underlineColorAndroid="transparent"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  }
});

export default TextArea;
