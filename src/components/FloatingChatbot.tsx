import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, BookOpen, Phone, User, Bot } from 'lucide-react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your MindCare assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Calendar, text: "Book a session", action: "book" },
    { icon: BookOpen, text: "View resources", action: "resources" },
    { icon: Phone, text: "Crisis support", action: "crisis" },
    { icon: User, text: "Find therapist", action: "therapist" }
  ];

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Navigation commands
    if (input.includes('take me to') || input.includes('go to') || input.includes('navigate')) {
      if (input.includes('resource')) {
        setTimeout(() => window.location.href = '/resources', 1000);
        return "Taking you to our resources page...";
      }
      if (input.includes('doctor') || input.includes('therapist')) {
        setTimeout(() => window.location.href = '/doctors', 1000);
        return "Navigating to find support professionals...";
      }
      if (input.includes('crisis') || input.includes('emergency')) {
        setTimeout(() => window.location.href = '/crisis', 1000);
        return "Redirecting to crisis resources immediately...";
      }
      if (input.includes('motivation')) {
        setTimeout(() => window.location.href = '/motivation', 1000);
        return "Taking you to daily motivation...";
      }
    }

    // Appointment booking
    if ((input.includes('book') || input.includes('schedule')) && input.includes('appointment')) {
      setTimeout(() => {
        window.location.href = '/doctors';
        setTimeout(() => {
          const appointmentSection = document.getElementById('appointment');
          if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }, 1000);
      return "I'll help you book an appointment! Taking you to our professionals page where you can select a doctor and schedule a session.";
    }
    
    // Mental health responses
    if (input.includes('depression') || input.includes('sad') || input.includes('down')) {
      return "I hear that you're going through a difficult time. Depression is treatable, and you don't have to face this alone. Would you like me to connect you with a counselor or show you some helpful resources?";
    }
    
    if (input.includes('anxiety') || input.includes('anxious') || input.includes('worried') || input.includes('panic')) {
      return "Anxiety can feel overwhelming, but there are effective ways to manage it. Try taking slow, deep breaths. Would you like me to guide you through a breathing exercise or schedule a session with an anxiety specialist?";
    }
    
    if (input.includes('headache') || input.includes('head hurts')) {
      return "For headaches, try resting in a quiet, dark room and staying hydrated. If headaches persist, consider consulting a healthcare provider. Would you like me to book a wellness session for you?";
    }
    
    if (input.includes('stress') || input.includes('overwhelmed')) {
      return "Feeling stressed is completely normal. Let's work on some coping strategies together. Would you like me to show you some quick stress-relief techniques or connect you with a stress management specialist?";
    }
    
    if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired')) {
      return "Sleep issues can really impact your wellbeing. Good sleep hygiene includes a regular schedule, limiting screens before bed, and creating a calm environment. Would you like tips for better sleep or to speak with a sleep specialist?";
    }

    if (input.includes('crisis') || input.includes('emergency') || input.includes('help')) {
      return "If you're in immediate danger, please call 911 or 988 (Crisis Lifeline) right away. For non-emergency support, I can connect you with our crisis counselors. How can I best support you right now?";
    }
    
    // Default responses
    const defaultResponses = [
      "I understand you're reaching out for support. Can you tell me more about what you're experiencing?",
      "Thank you for sharing with me. Your mental health matters, and I'm here to help you find the right support.",
      "I'm here to listen and help you find resources. What would be most helpful for you right now?",
      "It takes courage to reach out. How can I best support you today?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let responseText = '';
    
    switch (action) {
      case 'book':
        responseText = "I'd love to help you book a session! Let me connect you with our scheduling system.";
        setTimeout(() => window.location.href = '/doctors', 1000);
        break;
      case 'resources':
        responseText = "Here are some helpful mental health resources. Would you like information about anxiety, depression, stress management, or something else?";
        setTimeout(() => window.location.href = '/resources', 1000);
        break;
      case 'crisis':
        responseText = "For immediate crisis support, call 988 (Crisis Lifeline) or 911. I can also connect you with our crisis counselors right now.";
        setTimeout(() => window.location.href = '/crisis', 1000);
        break;
      case 'therapist':
        responseText = "I can help you find the right therapist for your needs. What type of support are you looking for?";
        setTimeout(() => window.location.href = '/doctors', 1000);
        break;
    }

    const botMessage = {
      id: messages.length + 1,
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full shadow-lg flex items-center justify-center z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bot className="h-8 w-8 text-white" />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full flex items-center justify-center"
                >
                  <Bot className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold">MindCare Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <span className="text-green-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.action}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm text-white"
                  >
                    <action.icon className="h-4 w-4" />
                    <span>{action.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 text-white p-2 rounded-lg transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;