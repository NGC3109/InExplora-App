import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { format, isToday } from 'date-fns';
import { styles } from '../styles/ListMessages';
import Config from 'react-native-config';
const Chats = ({ navigation }) => {
  const currentUser = useSelector(state => state.userReducer.user);
  const [chats, setChats] = useState()

  useEffect(() => {
    const newSocket = io(Config.SOCKET);

    const fetchChats = () => {
      newSocket.emit("getChatsByUserId", { userId: currentUser.id });
    };

    newSocket.on("connect", () => {
      newSocket.emit("getChatsByUserId", { userId: currentUser.id });
    });
    newSocket.on("chatsByUserId", ({success, data}) => {
      if (success) {
        setChats(data);
      } else {
        console.error('Error al recibir los chats');
      }
    });
    newSocket.on("chatUpdated", (update) => {
      console.log('update: ', update);
      setChats(currentChats => {
        const updatedChats = currentChats.map(chat => {
          if (chat._id === update.chatId) {
            return { 
              ...chat, 
              lastMessage: {
                message: update.lastMessage.message,
                timestamp: update.lastMessage.timestamp,
                displayName: update.lastMessage.displayName,
                profilePicture: update.lastMessage.profilePicture,
                sender: update.lastMessage.sender,
                readBy: update.lastMessage.readBy,
                receivedBy: update.lastMessage.receivedBy,
                unreadCounts: update.lastMessage.unreadCounts
              }, 
              date: update.lastMessage.timestamp,
              unreadCount: update.lastMessage.unreadCounts[currentUser.id] // Accede a unreadCounts para el currentUser.id
            };
          }
          return chat;
        });
        return updatedChats;
      });
    });
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChats();
    });
    return () => {
      newSocket.off("chatsByUserId");
      newSocket.off("chatUpdated");
      newSocket.disconnect();
      unsubscribe();
    };
  }, []);
  const goDetails = (chatId, name, avatar) => {
    navigation.navigate('Detalle', {
      chattingWith: {
        name: name,
        avatar: avatar,
        chatId: chatId
      },
    });
  }
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'p');
    } else {
      return format(date, 'MMM d, p');
    }
  };
  const UserItem = React.memo(({ item }) => {
    return(
      <TouchableWithoutFeedback onPress={() => goDetails(item._id, item.groupName, item.avatar)} style={styles.userContainer}>
        <View style={styles.userContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.messageDetails}>
            <Text style={styles.userName}>{item.groupName}</Text>
            <Text
              style={styles.lastMessage}
              numberOfLines={1}
              ellipsizeMode='tail'>
              {item?.lastMessage?.message?.length > 20 ? `${item.displayName}: ${item.lastMessage?.message.substring(0, 20)}...` : `${item.displayName}: ${item.lastMessage?.message}`}
            </Text>
          </View>
          <View style={styles.dateAndBadgeContainer}>
            <Text style={styles.messageDate}>{formatTimestamp(item.date)}</Text>
            {item.unreadCount > 0 && (
              <View style={styles.messageCountContainer}>
                <Text style={styles.messageCountText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};
export default Chats;
