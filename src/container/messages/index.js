import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format, isToday } from 'date-fns';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import MessageTemplate from '../../components/messages';
import { ObjectId } from 'bson';
import 'react-native-get-random-values';
import Config from 'react-native-config';

const MessageScreen = () => {
  const route = useRoute();
  const { chattingWith } = route.params;
  const { chatId } = chattingWith;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingOldMessages, setLoadingOldMessages] = useState(false);
  const scrollViewRef = useRef(null);
  const currentUserId = useSelector(state => state.userReducer.user);

  useEffect(() => {
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

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      _id: new ObjectId().toString(),
      message: messageText,
      timestamp: new Date(),
      isSentByCurrentUser: true,
      sender: currentUserId.id
    };

    if (socket) {
      socket.emit("sendMessage", { ...newMessage, chatId });
    }

    setMessages(prevMessages => {
      const updatedMessages = [newMessage, ...prevMessages];
      return formatMessages(updatedMessages);
    });
    setMessageText('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'p');
    } else {
      return format(date, 'MMM d, p');
    }
  };

  const handleAttachment = () => {
    console.log('Attachment');
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
