
// src/utils/aiSimulator.js
// AI response simulator with realistic delays and varied responses
export const generateAIResponse = async (userMessage) => {
  // Simulate network delay
  const delay = Math.random() * 2000 + 1000; // 1-3 seconds
  await new Promise(resolve => setTimeout(resolve, delay));

  const message = userMessage.toLowerCase();
  
  // Simple response logic based on keywords
  if (message.includes('hello') || message.includes('hi')) {
    return getRandomResponse([
      "Hello! How can I assist you today?",
      "Hi there! What can I help you with?",
      "Hey! I'm here to help. What's on your mind?",
    ]);
  }
  
  if (message.includes('how are you')) {
    return getRandomResponse([
      "I'm doing well, thank you for asking! How are you doing?",
      "I'm functioning perfectly! How can I help you today?",
      "I'm great! Ready to assist you with whatever you need.",
    ]);
  }
  
  if (message.includes('what') && message.includes('name')) {
    return "I'm ChatGPT, an AI assistant created by OpenAI. I'm here to help answer questions and assist with various tasks!";
  }
  
  if (message.includes('weather')) {
    return getRandomResponse([
      "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for the most current conditions in your area.",
      "I can't check the weather for you, but you can try asking a weather service or checking your local forecast!",
    ]);
  }
  
  if (message.includes('joke')) {
    return getRandomResponse([
      "Why don't scientists trust atoms? Because they make up everything!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "Why don't eggs tell jokes? They'd crack each other up!",
    ]);
  }
  
  if (message.includes('help')) {
    return "I'm here to help! I can assist with answering questions, explaining concepts, helping with writing, math problems, coding, and much more. What would you like help with?";
  }
  
  // Default responses for general queries
  return getRandomResponse([
    "That's an interesting question! While I don't have access to real-time information, I'd be happy to help based on my training data. Could you provide more context?",
    "I'd be glad to help with that! Can you tell me more about what you're looking for?",
    "That's a great question. Let me think about that and provide you with the best answer I can based on my knowledge.",
    "I understand you're asking about that topic. While I have some knowledge about it, could you be more specific about what aspect you're most interested in?",
    "Thanks for your question! I'll do my best to provide a helpful response. Is there a particular angle or aspect you'd like me to focus on?",
  ]);
};

const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};