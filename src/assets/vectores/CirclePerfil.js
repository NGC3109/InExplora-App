import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CirclePerfil = ({ progress }) => {
  const radius = 60;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.profileImageContainer}>
      <Svg width="140" height="140" viewBox="0 0 140 140" style={styles.circularProgress}>
        <Circle
          stroke="#e0e0e0"
          fill="none"
          cx="70"
          cy="70"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#FF3E3E"
          fill="none"
          cx="70"
          cy="70"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.iconContainer}>
        <Icon name="albums-outline" size={80} color="#A061C9" />
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>{progress}% completado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgress: {
    transform: [{ rotate: '-90deg' }],
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#FF3E3E',
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default CirclePerfil;
