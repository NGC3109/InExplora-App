import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import MessageTemplate from '../../components/messages';
import { ObjectId } from 'bson';
import 'react-native-get-random-values';
import Config from 'react-native-config';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const MessageScreen = () => {
  const route = useRoute();
  const { chattingWith } = route.params;
  const { chatId } = chattingWith;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false); // Estado de cancelación
  const scrollViewRef = useRef(null);
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          ]);

          const allGranted = Object.values(granted).every(result => result === PermissionsAndroid.RESULTS.GRANTED);

          if (allGranted) {
            console.log('Todos los permisos concedidos');
          } else {
            console.log('Permisos denegados');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    const newSocket = io(Config.SOCKET);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinChat", { chatId });
      loadOldMessages(newSocket, chatId, page);
    });

    newSocket.on("oldMessages", (response) => {
      const formattedNewMessages = formatMessages(response.data.map(msg => ({
        ...msg,
        isSentByCurrentUser: msg.sender === currentUserId.id,
        isReceived: msg.receivedBy.includes(currentUserId.id),
        isRead: msg.readBy.includes(currentUserId.id)
      })));
      setMessages(prevMessages => [...prevMessages, ...formattedNewMessages]);
      setLoadingOldMessages(false);
    });

    newSocket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
        if (!messageExists) {
          const updatedMessages = [newMessage, ...prevMessages];
          return formatMessages(updatedMessages);
        }
        return prevMessages;
      });
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("oldMessages");
      newSocket.off("newMessage");
      newSocket.disconnect();
    };
  }, [chatId, currentUserId, page]);

  const loadOldMessages = (socket, chatId, page) => {
    setLoadingOldMessages(true);
    socket.emit("getOldMessages", { chatId, page, limit: 20 });
  };

  const formatMessages = (messages) => {
    return messages.map((msg, index, array) => {
      const isSentByCurrentUser = msg.sender === currentUserId.id;
      const isLastUninterruptedMessageByUser = 
        index === array.length - 1 ||
        array[index + 1].sender !== msg.sender;
      const showAvatar = !isSentByCurrentUser && isLastUninterruptedMessageByUser;
      const pendingStatus = msg.pending ? 'Enviando...' : 'Enviado';
      return {
        ...msg,
        showAvatar,
        isSentByCurrentUser,
        pendingStatus,
        isReceived: msg.receivedBy && msg.receivedBy.includes(currentUserId.id),
        isRead: msg.readBy && msg.readBy.includes(currentUserId.id)
      };
    });
  };

  const handleSend = (audio) => {
    if (!messageText.trim() && !audio) return;

    const newMessage = {
      _id: new ObjectId().toString(),
      message: messageText,
      timestamp: new Date(),
      isSentByCurrentUser: true,
      sender: currentUserId.id,
      audioFile: audio ? { 
        buffer: audio.buffer, 
        originalname: audio.name, 
        mimetype: audio.type,
        duration: audio.duration
      } : null
    };

    if (socket) {
      socket.emit("sendMessage", { ...newMessage, chatId });
    }

    setMessages(prevMessages => {
      const updatedMessages = [newMessage, ...prevMessages];
      return formatMessages(updatedMessages);
    });

    setMessageText('');
    setAudioFile(null);
    setAudioDuration(0);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'p');
  };

  const handleAttachment = () => {
    console.log('Attachment');
  };

  const onStartRecord = async () => {
    try {
      setIsCancelled(false); // Reinicia el estado de cancelación
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Recording:', e.currentPosition);
        setAudioDuration(e.currentPosition);
        return;
      });
      setIsRecording(true);
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const onStopRecord = async () => {
    try {
      if (isRecording && !isCancelled) {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        console.log('Recording stopped:', result);
        const audioBuffer = await RNFS.readFile(result, 'base64');
        setAudioFile({
          buffer: `data:audio/aac;base64,${audioBuffer}`,
          name: result.split('/').pop(),
          type: 'audio/aac',
          url: result,
          duration: audioDuration,
        });
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const onCancelRecord = async () => {
    try {
      if (isRecording) {
        setIsCancelled(true); // Establece el estado de cancelación
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        setAudioFile(null);
        console.log('Recording cancelled');
      }
    } catch (error) {
      console.error('Error cancelling recording:', error);
    }
  };

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const ids = viewableItems.map(item => item.item._id);
    if (ids.length > 0 && socket) {
      socket.emit("markMessagesRead", { messageIds: ids, userId: currentUserId.id, chatId });
    } else {
      console.log('Socket no está conectado o es null:', socket);
    }
  }, [socket, currentUserId.id, chatId]);

  const handleScroll = (event) => {
    const { nativeEvent } = event;
    if (nativeEvent.contentOffset.y < 10 && !loadingOldMessages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleEndReached = () => {
    if (!loadingOldMessages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <MessageTemplate 
      handleAttachment={handleAttachment}
      formatTimestamp={formatTimestamp}
      handleSend={handleSend}
      onStartRecord={onStartRecord}
      onStopRecord={onStopRecord}
      onCancelRecord={onCancelRecord} // Pasa la función de cancelación
      isRecording={isRecording}
      recordedAudio={audioFile} // Pasa el audio grabado al componente MessageTemplate
      setRecordedAudio={setAudioFile} // Pasa el setter de audio grabado
      scrollViewRef={scrollViewRef}
      messages={messages}
      messageText={messageText}
      setMessageText={setMessageText}
      handleViewableItemsChanged={handleViewableItemsChanged}
      handleScroll={handleScroll}
      handleEndReached={handleEndReached}
    />
  );
};

export default MessageScreen;
