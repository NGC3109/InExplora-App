import React, { useState, useEffect } from 'react';
import { 
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/MessagesDetail';
import { IconCheck, IconCheckGreen } from '../../assets/vectores';
import { formatCustomDate } from '../../utils/functions';
import AudioPlayer from '../ui/AudioPlayer';

const MessageTemplate = ({
    handleAttachment,
    formatTimestamp,
    handleSend,
    onStartRecord,
    onStopRecord,
    onCancelRecord,
    isRecording,
    messages,
    setMessageText,
    messageText,
    recordedAudio,
    setRecordedAudio,
    handleViewableItemsChanged,
    handleEndReached,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTextChange = (text) => {
    setMessageText(text);
    setIsTyping(text.length > 0);
  };

  const handleSendAudio = () => {
    if (recordedAudio) {
      handleSend(recordedAudio);
      setRecordedAudio(null);
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };
  
  const getFormattedMessages = (messages) => {
    const groupedMessages = groupMessagesByDate(messages);
    const formattedMessages = [];
    Object.keys(groupedMessages).forEach(date => {
      groupedMessages[date].forEach(message => formattedMessages.push({ type: 'message', ...message }));
      formattedMessages.push({ type: 'date', date: formatCustomDate(date) });
    });
    return formattedMessages;
  };

  const renderMessageItem = ({ item, index }) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      );
    }
    return (
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
              {item.message && <Text style={styles.messageText}>{item.message}</Text>}
              {item.audioFile && <AudioPlayer audioUri={item.audioFile.url} duration={item.audioFile.duration} />}
              <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>
                  {formatTimestamp(item.timestamp)}
                  {item.isSentByCurrentUser && (
                    item.isRead ? <IconCheckGreen /> : <IconCheck />
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getFormattedMessages(messages)}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached}
        inverted
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flexGrow: 1 }}
        onViewableItemsChanged={handleViewableItemsChanged}
        ListHeaderComponent={<View style={{height: 2, width: '100%', backgroundColor: '#F5F5F5', marginTop: 15}}></View>}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50 // Considerar un mensaje como "visto" si el 50% es visible
        }}
      />
      <View style={styles.inputContainer}>
        {recordedAudio ? (
          <>
            <AudioPlayer audioUri={recordedAudio.url} duration={recordedAudio.duration} customWidth={true}/>
            <TouchableOpacity onPress={handleSendAudio} style={styles.iconButton}>
              <Icon name="send" style={styles.sendIcon} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu mensaje"
              placeholderTextColor="#999"
              value={messageText}
              onChangeText={handleTextChange}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleAttachment} style={styles.iconButton}>
              <Icon name="camera" size={24} color="#000" />
            </TouchableOpacity>
            {isTyping ? (
              <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
                <Icon name="send" style={styles.sendIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPressIn={onStartRecord} 
                onPressOut={onStopRecord} 
                style={isRecording ? styles.recordingButton : styles.iconButton}
              >
                <Icon name="microphone" size={24} color={isRecording ? "red" : "#000"} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default MessageTemplate;
