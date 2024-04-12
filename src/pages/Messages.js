import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, isToday  } from 'date-fns';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { styles } from '../styles/MessagesDetail';

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

  const formatMessages = (messages) => {
    let lastSenderId = null;
    return messages.map(msg => {
      const showAvatar = lastSenderId !== msg.sender;
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
      sender: currentUserId.id,
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
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/pattern2.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <ScrollView 
          style={styles.messagesContainer} 
          ref={scrollViewRef} 
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((message, index) => (
            <View key={index} style={[
              message.isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
              { marginBottom: index === messages.length - 1 ? 20 : 3 }
            ]}>
              {message.showAvatar ? (
                <Image
                  source={{ uri: message.profilePicture }}
                  style={message.isSentByCurrentUser ? styles.avatarSent : styles.avatarReceived}
                />
              ) : (<View style={styles.avatarPlaceholder} />)}
              <View style={message.isSentByCurrentUser ? styles.messageBubbleSend : styles.messageBubbleReceive}>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    {message.showAvatar && !message.isSentByCurrentUser && (
                      <Text style={styles.senderName}>{message.displayName}</Text>
                    )}
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.messageText}>{message.message}</Text>
                  <View style={styles.timestampContainer}>
                    <Text style={styles.timestamp}>
                      {formatTimestamp(message.timestamp)}
                      <Icon name="check" size={12} color="#999" />
                    </Text>
                  </View>
                </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleEmoji} style={styles.iconButton}>
          <Icon name="smile-o" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAttachment} style={styles.iconButton}>
          <Icon name="paperclip" size={24} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor="#999"
          value={messageText}
          onChangeText={setMessageText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
          <Icon name="send" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageScreen;
