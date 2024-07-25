import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CirclePerfil = ({ progress, profilePicture }) => {
  const radius = 60;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;
  const hasCustomProfilePicture = profilePicture !== 'https://via.placeholder.com/150';
  const circleColor = progress === 100 ? '#4CAF50' : '#FF3E3E';

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
          stroke={circleColor}
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
        {hasCustomProfilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Icon name="albums-outline" size={80} color="#A061C9" />
        )}
      </View>
      <View style={[styles.progressTextContainer, progress === 100 ? styles.backgrounPorcentajeGreen : styles.backgrounPorcentajeRed]}>
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
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  progressTextContainer: {
    position: 'absolute',
    bottom: -10,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  backgrounPorcentajeGreen: {
    backgroundColor: '#4CAF50',
  },
  backgrounPorcentajeRed: {
    backgroundColor: '#FF3E3E',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default CirclePerfil;
