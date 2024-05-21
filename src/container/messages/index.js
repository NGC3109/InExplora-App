import React, { useState, useEffect, useRef, useCallback  } from 'react';

import { format, isToday  } from 'date-fns';
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
    const scrollViewRef = useRef(null);
    const currentUserId = useSelector(state => state.userReducer.user);

    useEffect(() => {
        const newSocket = io(Config.SOCKET);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            newSocket.emit("joinChat", { chatId });
            newSocket.emit("getOldMessages", { _id: chatId });
        });
        newSocket.on("oldMessages", (response) => {
          const formattedNewMessages = formatMessages(response.data.map(msg => ({
            ...msg,
            isSentByCurrentUser: msg.sender === currentUserId.id,
            isReceived: msg.receivedBy.includes(currentUserId.id),
            isRead: msg.readBy.includes(currentUserId.id)
          })));
          setMessages(prevMessages => [...formattedNewMessages, ...prevMessages]);
        });
        newSocket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => {
            const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
            if (!messageExists) {
            const updatedMessages = [{
                ...newMessage,
                isSentByCurrentUser: newMessage.sender === currentUserId.id,
                isReceived: newMessage.receivedBy && newMessage.receivedBy.includes(currentUserId.id),
                isRead: newMessage.readBy && newMessage.readBy.includes(currentUserId.id)
            }, ...prevMessages];
            return formatMessages(updatedMessages);
            }
            return prevMessages;
        });
        });
        return () => {
        newSocket.off("connect");
        newSocket.off("oldMessages");
        newSocket.off("newMessage");
        newSocket.off("messageConfirmation");
        newSocket.disconnect();
        };
  }, [chatId, currentUserId]);
  
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
        pendingStatus, // Agrega estado pendiente al mensaje
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
        // handleScroll={handleScroll}
    />
  );
};

export default MessageScreen;
