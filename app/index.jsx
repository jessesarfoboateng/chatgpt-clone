// app/index.js (Chat Screen)
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBar from '../src/components/InputBar';
import MessageBubble from '../src/components/MessageBubble';
import TypingIndicator from '../src/components/TypingIndicator';
import { useTheme } from '../src/context/ThemeContext';
import { createStyles } from '../src/styles/ChatStyles';
import { generateAIResponse } from '../src/utils/aiSimulator';

export default function ChatScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m ChatGPT, your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Simulate AI response with delay
      const aiResponse = await generateAIResponse(text);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      Alert.alert('Error', 'Failed to generate response. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = (text) => {
    Alert.alert(
      'Copy Message',
      'Message copied to clipboard!',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderMessage = ({ item }) => (
    <MessageBubble
      message={item}
      onLongPress={() => handleCopyMessage(item.text)}
    />
  );

  const renderFooter = () => {
    if (isTyping) {
      return <TypingIndicator />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
        <InputBar onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
