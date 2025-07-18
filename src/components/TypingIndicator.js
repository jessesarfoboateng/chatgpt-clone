// src/components/TypingIndicator.js
import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createTypingStyles } from '../styles/TypingStyles';

const TypingIndicator = () => {
  const { theme } = useTheme();
  const styles = createTypingStyles(theme);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, animatedStyle]} />
          <Animated.View style={[styles.dot, animatedStyle]} />
          <Animated.View style={[styles.dot, animatedStyle]} />
        </View>
        <Text style={styles.typingText}>ChatGPT is typing...</Text>
      </View>
    </View>
  );
};

export default TypingIndicator;
