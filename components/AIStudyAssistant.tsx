import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Speech from 'expo-speech';
import Card from '@/components/ui/Card';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'file' | 'quiz' | 'summary';
  metadata?: any;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function AIStudyAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Study Assistant. I can help you with:\n\n• Summarizing documents\n• Creating quizzes\n• Explaining concepts\n• Study planning\n\nHow can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes('quiz') || input.includes('test')) {
      return {
        id: Date.now().toString(),
        text: 'I\'ll create a quiz for you! Here are some sample questions:',
        isUser: false,
        timestamp: new Date(),
        type: 'quiz',
        metadata: {
          questions: [
            {
              question: 'What is the capital of Kenya?',
              options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
              correctAnswer: 0
            },
            {
              question: 'Which university is the oldest in Kenya?',
              options: ['Kenyatta University', 'University of Nairobi', 'Moi University', 'JKUAT'],
              correctAnswer: 1
            }
          ]
        }
      };
    }
    
    if (input.includes('summary') || input.includes('summarize')) {
      return {
        id: Date.now().toString(),
        text: 'I can help you summarize documents! Please upload a file or paste the text you\'d like me to summarize.',
        isUser: false,
        timestamp: new Date(),
        type: 'summary'
      };
    }
    
    if (input.includes('study plan') || input.includes('schedule')) {
      return {
        id: Date.now().toString(),
        text: 'Here\'s a suggested study plan:\n\n📚 **Week 1-2**: Review fundamentals\n📝 **Week 3**: Practice problems\n🧠 **Week 4**: Mock exams\n✅ **Week 5**: Final review\n\nWould you like me to customize this based on your specific subjects?',
        isUser: false,
        timestamp: new Date(),
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      text: 'I understand you\'re asking about "' + userInput + '". Let me help you with that!\n\nCould you provide more specific details about what you\'d like to learn or accomplish?',
      isUser: false,
      timestamp: new Date(),
    };
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/plain', 'application/msword'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const fileMessage: Message = {
          id: Date.now().toString(),
          text: `📎 Uploaded: ${result.assets[0].name}`,
          isUser: true,
          timestamp: new Date(),
          type: 'file',
          metadata: { file: result.assets[0] }
        };

        setMessages(prev => [...prev, fileMessage]);
        
        // Simulate file processing
        setTimeout(() => {
          const aiResponse: Message = {
            id: Date.now().toString(),
            text: `I've analyzed your document "${result.assets[0].name}". Here's a summary:\n\n📋 **Key Points:**\n• Main concept 1\n• Important detail 2\n• Critical information 3\n\n💡 **Study Tips:**\n• Focus on the highlighted concepts\n• Review the examples provided\n• Practice the exercises at the end\n\nWould you like me to create a quiz based on this content?`,
            isUser: false,
            timestamp: new Date(),
            type: 'summary'
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 2000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file. Please try again.');
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      setInputText('Can you help me understand calculus derivatives?');
    }, 3000);
  };

  const speakMessage = (text: string) => {
    Speech.speak(text, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const renderQuiz = (questions: QuizQuestion[]) => (
    <View style={styles.quizContainer}>
      {questions.map((q, index) => (
        <Card key={index} style={styles.quizCard}>
          <Text style={styles.quizQuestion}>{q.question}</Text>
          {q.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={styles.quizOption}
              onPress={() => Alert.alert(
                optionIndex === q.correctAnswer ? 'Correct!' : 'Incorrect',
                optionIndex === q.correctAnswer 
                  ? 'Well done!' 
                  : `The correct answer is: ${q.options[q.correctAnswer]}`
              )}>
              <Text style={styles.quizOptionText}>
                {String.fromCharCode(65 + optionIndex)}. {option}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
      ))}
    </View>
  );

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage
      ]}>
      <View style={styles.messageContent}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {message.text}
        </Text>
        
        {message.type === 'quiz' && message.metadata?.questions && 
          renderQuiz(message.metadata.questions)
        }
        
        <Text style={styles.messageTime}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      
      {!message.isUser && (
        <TouchableOpacity 
          style={styles.speakButton}
          onPress={() => speakMessage(message.text)}>
          <Ionicons name="volume-high" size={16} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={20} color="#BB0000" />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Study Assistant</Text>
            <Text style={styles.headerStatus}>Online • Ready to help</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
        
        {isLoading && (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <View style={styles.messageContent}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFileUpload}>
            <Ionicons name="attach" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, isListening && styles.listeningButton]} 
            onPress={startVoiceInput}>
            <Ionicons name="mic" size={20} color={isListening ? "#BB0000" : "#666"} />
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything about your studies..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          onSubmitEditing={() => sendMessage(inputText)}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
          onPress={() => sendMessage(inputText)}
          disabled={!inputText.trim()}>
          <Ionicons name="send" size={20} color={inputText.trim() ? "#fff" : "#999"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BB0000' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  headerStatus: {
    fontSize: 12,
    color: '#228B22',
  },
  headerAction: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#36454F',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 5,
  },
  speakButton: {
    marginLeft: 8,
    padding: 5,
  },
  quizContainer: {
    marginTop: 10,
  },
  quizCard: {
    marginBottom: 10,
    padding: 15,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
  },
  quizOption: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  quizOptionText: {
    fontSize: 14,
    color: '#36454F',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputActions: {
    flexDirection: 'row',
    marginRight: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  listeningButton: {
    backgroundColor: '#BB0000' + '20',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonActive: {
    backgroundColor: '#BB0000',
  },
});