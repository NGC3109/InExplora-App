import React from 'react';
import { 
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../../styles/MessagesDetail';

const MessageTemplate = ({
    handleAttachment,
    handleEmoji,
    formatTimestamp,
    handleSend,
    scrollViewRef,
    messages,
    setMessageText,
    messageText
}) => {
  return (
    <View style={styles.container} >
        <ImageBackground 
          source={require('../../assets/pattern2.png')}
          style={styles.container}
          resizeMode="cover"
        >
            <KeyboardAwareScrollView
                style={styles.messagesContainer}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                extraScrollHeight={20} // Puedes ajustar este valor si es necesario
                enableOnAndroid={true} // Habilita el comportamiento automático en Android
                enableAutomaticScroll={Platform.OS === "ios"} // Habilita el comportamiento automático en iOS
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
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
                        ) : (<View style={!message.isSentByCurrentUser && styles.avatarPlaceholder} />)}
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
            </KeyboardAwareScrollView>
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

export default MessageTemplate;
