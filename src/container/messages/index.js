import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import MessageTemplate from '../../components/messages';
import 'react-native-get-random-values';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_MESSAGE, LOAD_MESSAGES } from '../../utils/constants';
import { ObjectId } from 'bson';  // Importar ObjectId de bson

const audioRecorderPlayer = new AudioRecorderPlayer();

const MessageScreen = () => {
  const route = useRoute();
  const { chattingWith } = route.params;
  const { chatId } = chattingWith;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const scrollViewRef = useRef(null);
  const currentUserId = useSelector(state => state.userReducer.user);
  const socket = useSelector(state => state.initSocketReducer.socket);
  const dispatch = useDispatch();

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

          if (!allGranted) {
            console.log('Permisos denegados');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    const loadCachedMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
        if (cachedMessages) {
          const parsedMessages = JSON.parse(cachedMessages);
          setMessages(parsedMessages);
          dispatch({ type: LOAD_MESSAGES, payload: parsedMessages });
        }
      } catch (error) {
        console.error('Error loading cached messages:', error);
      }
    };

    loadCachedMessages();

    const handleConnect = () => {
      console.log('Socket connected');
      socket.emit("joinChat", { chatId });
      loadOldMessages(socket, chatId, page);
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    socket.on("oldMessages", async (response) => {
      const formattedNewMessages = formatMessages(response.data.map(msg => ({
        ...msg,
        isSentByCurrentUser: msg.sender === currentUserId.id,
        isReceived: msg.receivedBy.includes(currentUserId.id),
        isRead: msg.readBy.includes(currentUserId.id)
      })));

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, ...formattedNewMessages];
        const uniqueMessages = removeDuplicateMessages(updatedMessages);
        AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(uniqueMessages));
        dispatch({ type: LOAD_MESSAGES, payload: uniqueMessages });
        return uniqueMessages;
      });
      setLoadingOldMessages(false);
    });

    socket.on("newMessage", async (newMessage) => {
      console.log("Received new message from server:", newMessage);
      setMessages(prevMessages => {
        const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
        if (!messageExists) {
          const updatedMessages = [newMessage, ...prevMessages];
          const uniqueMessages = removeDuplicateMessages(updatedMessages);
          AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(uniqueMessages));
          dispatch({ type: ADD_MESSAGE, payload: newMessage });
          return uniqueMessages;
        }
        return prevMessages;
      });
    });

    return () => {
      if (socket) {
        socket.off("connect", handleConnect);
        socket.off("oldMessages");
        socket.off("newMessage");
      }
    };
  }, [socket, chatId, currentUserId, page]);

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

  const removeDuplicateMessages = (messages) => {
    const uniqueMessagesMap = new Map();
    messages.forEach(msg => uniqueMessagesMap.set(msg._id, msg));
    return Array.from(uniqueMessagesMap.values());
  };

  const handleSend = async () => {
    if (!messageText.trim() && !audioFile) return;

    const newMessageId = new ObjectId().toString();  // Generar un ID único usando ObjectId

    const newMessage = {
      _id: newMessageId,  // Asignar el ID generado al mensaje
      message: messageText,
      timestamp: new Date(),
      isSentByCurrentUser: true,
      sender: currentUserId.id,
      audioFile: audioFile ? { 
        buffer: audioFile.buffer, 
        originalname: audioFile.name, 
        mimetype: audioFile.type,
        duration: audioFile.duration,
        url: audioFile.url,
      } : null
    };

    setMessages(prevMessages => {
      const updatedMessages = [newMessage, ...prevMessages];
      const uniqueMessages = removeDuplicateMessages(updatedMessages);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(uniqueMessages));
      dispatch({ type: ADD_MESSAGE, payload: newMessage });

      if (socket) {
        socket.emit("sendMessage", { chatId, sender: currentUserId.id, message: newMessage, audioFile });
      }

      return uniqueMessages;
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
      setIsCancelled(false);
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        setAudioDuration(e.currentPosition);
        return;
      });
      setIsRecording(true);
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
        setIsCancelled(true);
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        setAudioFile(null);
      }
    } catch (error) {
      console.error('Error cancelling recording:', error);
    }
  };

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const ids = viewableItems.map(item => item.item._id);
    if (ids.length > 0 && socket) {
      socket.emit("markMessagesRead", { messageIds: ids, userId: currentUserId.id, chatId });
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
      onCancelRecord={onCancelRecord}
      isRecording={isRecording}
      recordedAudio={audioFile}
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
