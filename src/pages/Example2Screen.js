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
      fetchChats();
    });
    newSocket.on("chatsByUserId", ({success, data}) => {
      if (success) {
        setChats(data);
      } else {
        console.error('Error al recibir los chats');
      }
    });
    newSocket.on("chatUpdated", (update) => {
      setChats(currentChats => {
        const updatedChats = currentChats.map(chat => {
          if (chat._id === update.chatId) {
            return { ...chat, lastMessage: update.lastMessage.message, date: update.lastMessage.timestamp, displayName: update.lastMessage.displayName };
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
  const UserItem = React.memo(({ item }) => (
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
            {item?.lastMessage?.length > 20 ? `${item.displayName}: ${item.lastMessage.substring(0, 20)}...` : `${item.displayName}: ${item.lastMessage}`}
          </Text>
        </View>
        <View style={styles.dateAndBadgeContainer}>
          <Text style={styles.messageDate}>{formatTimestamp(item.date)}</Text>
          {item.messages > 0 && (
            <View style={styles.messageCountContainer}>
              <Text style={styles.messageCountText}>{item.messages}</Text>
            </View>
          )}
        </View>
      </View>8.614.981-8
    </TouchableWithoutFeedback>
  ));
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
