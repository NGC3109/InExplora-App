import React from 'react';
import { 
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/MessagesDetail';

const MessageTemplate = ({
    handleAttachment,
    formatTimestamp,
    handleSend,
    messages,
    setMessageText,
    messageText,
    handleViewableItemsChanged,
    handleScroll,
    handleEndReached,
}) => {
  const renderMessageItem = ({ item, index }) => (
    <View
      style={[
        item.isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
        { marginBottom: index === messages.length - 1 ? 20 : 3 }
      ]}
    >
      {item.showAvatar ? (
        <Image source={{ uri: item.profilePicture }} style={item.isSentByCurrentUser ? styles.avatarSent : styles.avatarReceived} />
      ) : (
        <View style={!item.isSentByCurrentUser && styles.avatarPlaceholder} />
      )}
      <View style={item.isSentByCurrentUser ? styles.messageBubbleSend : styles.messageBubbleReceive}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          {item.showAvatar && !item.isSentByCurrentUser && <Text style={styles.senderName}>{item.displayName}</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.messageText}>{item.message}</Text>
            <View style={styles.timestampContainer}>
              <Text style={styles.timestamp}>
                {formatTimestamp(item.timestamp)}
                <Icon name="check" size={12} color="#999" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/pattern2.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item._id}
          onEndReached={handleEndReached}
          inverted
          onEndReachedThreshold={0.1}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ flexGrow: 1 }}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50 // Considerar un mensaje como "visto" si el 50% es visible
          }}
        />
      </ImageBackground>
      <View style={styles.inputContainer}>
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

export default MessageTemplate;
