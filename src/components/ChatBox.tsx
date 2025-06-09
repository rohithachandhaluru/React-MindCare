import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip } from 'lucide-react';
import { addChatMessage, getChatHistory } from '../utils/auth';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support' | 'ai';
  timestamp: Date;
  supporterName?: string;
}

interface ChatBoxProps {
  supporterName: string;
  supporterId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ supporterName, supporterId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  
  // Load existing chat history or initialize with welcome message
  const [messages, setMessages] = useState<Message[]>(() => {
    const existingChat = getChatHistory(supporterId);
    if (existingChat && existingChat.messages.length > 0) {
      return existingChat.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    
    // Default welcome messages for new chats
    return [
      {
        id: '1',
        text: "Hello! I'm here to listen and support you. Everything you share here is confidential and safe. How are you feeling today?",
        sender: 'support' as const,
        timestamp: new Date(),
        supporterName: supporterName,
      },
      {
        id: '2',
        text: "I'm here to listen 🤗 Take your time, there's no pressure to share anything you're not comfortable with.",
        sender: 'ai' as const,
        timestamp: new Date(),
      },
    ];
  });

  // Check if user is at bottom of chat
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(isBottom);
    }
  };

  const scrollToBottom = () => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAtBottom]);

  const aiResponses = [
    "Everything you share is safe with me 💬",
    "You're being very brave by reaching out. That takes real strength.",
    "I can hear that you're going through a lot right now. Thank you for trusting me with this.",
    "Your feelings are completely valid. It's okay to feel this way.",
    "You don't have to go through this alone. I'm here with you.",
    "Take a deep breath with me. You're in a safe space here.",
    "What you're experiencing sounds really challenging. How can I best support you right now?",
    "You're showing incredible resilience. I want you to know that.",
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      };

      // Add to local state
      setMessages(prev => [...prev, userMessage]);
      
      // Save to persistent storage
      addChatMessage(supporterId, supporterName, userMessage);
      
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          sender: Math.random() > 0.5 ? 'ai' : 'support',
          timestamp: new Date(),
          supporterName: supporterName,
        };
        
        setMessages(prev => [...prev, aiResponse]);
        addChatMessage(supporterId, supporterName, aiResponse);
        setIsTyping(false);
      }, 1500 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {supporterName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{supporterName}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white'
                    : message.sender === 'ai'
                    ? 'bg-pink-500/20 text-pink-100 border border-pink-500/30'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                {message.sender !== 'user' && (
                  <div className="text-xs text-gray-400 mb-1">
                    {message.sender === 'ai' ? 'AI Assistant' : message.supporterName}
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... Press Enter to send"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none max-h-32"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Smile className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;