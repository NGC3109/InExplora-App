import React, { useState, useEffect, useRef } from 'react';

import { format, isToday  } from 'date-fns';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import MessageTemplate from '../../components/messages';
import { Keyboard } from 'react-native';

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
    const newSocket = io("http://192.168.28.1:3001");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinChat", { chatId });
      newSocket.emit("getOldMessages", { _id: chatId });
    });

    newSocket.on("oldMessages", (oldMessages) => {
      // Asegúrate de aplicar la función formatMessages también aquí
      const formattedOldMessages = formatMessages(oldMessages.map(msg => ({
        ...msg,
        isSentByCurrentUser: msg.sender === currentUserId.id,
        isReceived: msg.receivedBy.includes(currentUserId.id),
        isRead: msg.readBy.includes(currentUserId.id)
      })));
      setMessages(formattedOldMessages);
    });

    newSocket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => {
        // Verificar si el mensaje ya existe para prevenir duplicados
        const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
        
        // Si no existe, agrega el nuevo mensaje y formatea todos los mensajes
        if (!messageExists) {
          const updatedMessages = [...prevMessages, {
            ...newMessage,
            isSentByCurrentUser: newMessage.sender === currentUserId.id,
            isReceived: newMessage.receivedBy && newMessage.receivedBy.includes(currentUserId.id),
            isRead: newMessage.readBy && newMessage.readBy.includes(currentUserId.id)
          }];
          return formatMessages(updatedMessages);
        }
        
        // Si el mensaje ya existe, simplemente retorna los mensajes anteriores
        return prevMessages;
      });
    });
    // Limpieza al desmontar el componente
    return () => {
      newSocket.off("connect");
      newSocket.off("oldMessages");
      newSocket.off("newMessage");
      newSocket.disconnect();
    };
  }, [chatId, currentUserId]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  
    function _keyboardDidShow() {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    }
  
    function _keyboardDidHide() {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      });
    }
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const formatMessages = (messages) => {
    let lastSenderId = null;
    return messages.map(msg => {
      const isSentByCurrentUser = msg.sender === currentUserId.id;
      let showAvatar = false;
      if (lastSenderId !== msg.sender && !isSentByCurrentUser) {
        showAvatar = true;
      }
      lastSenderId = msg.sender; // Update the last sender ID for the next iteration
      return {
        ...msg,
        showAvatar,
        isSentByCurrentUser: msg.sender === currentUserId.id,
        isReceived: msg.receivedBy && msg.receivedBy.includes(currentUserId.id),
        isRead: msg.readBy && msg.readBy.includes(currentUserId.id)
      };
    });
  };
  const handleSend = () => {
    if (!messageText.trim()) return;
    
    const tempMessageId = Date.now(); // Temporal ID
    const newMessage = {
      message: messageText,
      timestamp: new Date(),
      isSentByCurrentUser: true,
      tempMessageId,
      sender: currentUserId.id
    };
  
    socket.emit("sendMessage", { ...newMessage, chatId });
  
    // Aquí también debes aplicar formatMessages para formatear el nuevo mensaje
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      return formatMessages(updatedMessages);
    });
  
    setMessageText('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      // Si fue enviado hoy, solo muestra la hora
      return format(date, 'p');
    } else {
      // Si no, muestra la fecha abreviada y la hora
      return format(date, 'MMM d, p');
    }
  };

  const handleEmoji = () => {
    console.log('Emoji');
  };

  const handleAttachment = () => {
    console.log('Attachment');
  };
  return (
    <MessageTemplate 
        handleAttachment={handleAttachment}
        handleEmoji={handleEmoji}
        formatTimestamp={formatTimestamp}
        handleSend={handleSend}
        scrollViewRef={scrollViewRef}
        messages={messages}
        messageText={messageText}
        setMessageText={setMessageText}
    />
  );
};

export default MessageScreen;
