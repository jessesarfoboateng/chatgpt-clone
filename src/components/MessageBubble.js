import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createMessageStyles } from '../styles/MessageStyles';

const MessageBubble = ({ message, onLongPress }) => {
  const { theme } = useTheme();
  const styles = createMessageStyles(theme);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      <TouchableOpacity
        onLongPress={onLongPress}
        style={[
          styles.messageBubble,
          message.isUser ? styles.userMessageBubble : styles.aiMessageBubble
        ]}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isUser ? styles.userTimestamp : styles.aiTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageBubble;