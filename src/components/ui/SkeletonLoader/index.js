// src/components/SkeletonLoader/SkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonLoader = ({ width, height, style }) => {
  return (
    <View style={[styles.container, { width, height }, style]}>
      <LinearGradient
        colors={['#e0e0e0', '#c7c7c7', '#e0e0e0']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SkeletonLoader;
