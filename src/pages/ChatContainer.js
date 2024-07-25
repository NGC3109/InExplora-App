import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../styles/ListMessages';

const Chats = ({ navigation }) => {
  const currentUser = useSelector(state => state.userReducer.user);
  const socket = useSelector(state => state.initSocketReducer.socket);
  const [chats, setChats] = useState([]);

  useEffect(() => {

    const fetchChats = () => {
      socket.emit("getChatsByUserId", { userId: currentUser.id });
    };

    socket.on("connect", fetchChats);
    socket.on("chatsByUserId", ({ success, data }) => {
      if (success) {
        setChats(data);
      } else {
        console.error('Error al recibir los chats');
      }
    });
    socket.on("chatUpdated", (update) => {
      setChats(currentChats => currentChats.map(chat => {
        if (chat._id === update.chatId) {
          return {
            ...chat,
            lastMessage: update.lastMessage.lastMessage,
            date: update.lastMessage.timestamp,
            unreadCount: update.lastMessage.unreadCounts[currentUser.id]
          };
        }
        return chat;
      }));
    });

    const unsubscribe = navigation.addListener('focus', fetchChats);

    return () => {
      socket.off("connect", fetchChats);
      socket.off("chatsByUserId");
      socket.off("chatUpdated");
      socket.disconnect();
      unsubscribe();
    };
  }, [currentUser.id, navigation]);

  const goDetails = useCallback((chatId, name, avatar) => {
    navigation.navigate('Detalle', {
      chattingWith: {
        name: name,
        avatar: avatar,
        chatId: chatId
      },
    });
  }, [navigation]);

  const UserItem = React.memo(({ item }) => (
    <TouchableWithoutFeedback onPress={() => goDetails(item._id, item.groupName, item.avatar)}>
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
            {item.lastMessage}
          </Text>
        </View>
        <View style={styles.dateAndBadgeContainer}>
          <Text style={styles.messageDate}>{item.dateFormatted}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.messageCountContainer}>
              <Text style={styles.messageCountText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
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
