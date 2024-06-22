import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SoundPlayer from 'react-native-sound-player';
import Slider from '@react-native-community/slider';
import { styles } from '../../../styles/MessagesDetail';

const AudioPlayer = ({ audioUri, duration, customWidth }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(duration);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {
      setIsPlaying(false);
      setCurrentPositionSec(0);
      clearInterval(intervalId);
    });

    const onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ duration }) => {
      if (!isNaN(duration)) {
        setCurrentDurationSec(duration * 1000); // Convertimos segundos a milisegundos
      }
    });

    return () => {
      onFinishedPlayingSubscription.remove();
      onFinishedLoadingSubscription.remove();
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const startInterval = () => {
    const id = setInterval(async () => {
      try {
        const info = await SoundPlayer.getInfo();
        setCurrentPositionSec(info.currentTime * 1000); // Convertimos segundos a milisegundos
      } catch (e) {
        console.log('Error getting current time', e);
      }
    }, 1000); // Actualiza cada segundo
    setIntervalId(id);
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      SoundPlayer.pause();
      setIsPlaying(false);
      clearInterval(intervalId);
    } else {
      try {
        await SoundPlayer.playUrl(audioUri);
        setIsPlaying(true);
        startInterval();
      } catch (e) {
        console.log(`cannot play the sound file`, e);
      }
    }
  };

  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={[!customWidth ? styles.audioMessageContainer : styles.audioMessageContainerCustom]}>
      <TouchableOpacity onPress={togglePlayPause}>
        <Icon name={isPlaying ? 'pause' : 'play'} size={24} color="#8496a0" />
      </TouchableOpacity>
      <Slider
        style={styles.audioSlider}
        minimumValue={0}
        maximumValue={currentDurationSec / 1000} // Convertimos milisegundos a segundos
        value={currentPositionSec / 1000} // Convertimos milisegundos a segundos
        onSlidingComplete={(value) => {
          SoundPlayer.seek(value);
          setCurrentPositionSec(value * 1000); // Convertimos segundos a milisegundos
        }}
      />
      <Text style={styles.audioDuration}>{formatDuration(currentDurationSec)}</Text>
    </View>
  );
};

export default AudioPlayer;
