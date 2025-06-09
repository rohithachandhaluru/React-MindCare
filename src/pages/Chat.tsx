import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import ChatBox from '../components/ChatBox';
import ProtectedAction from '../components/ProtectedAction';
import { isLoggedIn, getChatHistory } from '../utils/auth';

// Mock data for doctors
const doctorsData = [
  { id: 1, name: "Dr. Sarah Chen", status: "online" },
  { id: 2, name: "Dr. Marcus Johnson", status: "busy" },
  { id: 3, name: "Dr. Emily Rodriguez", status: "online" },
  { id: 4, name: "Alex Thompson", status: "online" },
  { id: 5, name: "Dr. Priya Patel", status: "offline" },
];

const Chat = () => {
  const { id } = useParams();
  const currentDoctor = doctorsData.find(d => d.id === parseInt(id || '1')) || doctorsData[0];
  const [selectedChatId, setSelectedChatId] = useState(parseInt(id || '1'));
  const [showLoginPrompt, setShowLoginPrompt] = useState(!isLoggedIn());

  useEffect(() => {
    // Check if user is logged in when component mounts or id changes
    setShowLoginPrompt(!isLoggedIn());
  }, [id]);

  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  if (showLoginPrompt) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Chat Access Required</h2>
          <p className="text-gray-300 mb-6">
            Please log in or sign up to access our secure chat feature and connect with mental health professionals.
          </p>
          <ProtectedAction
            onSuccess={() => setShowLoginPrompt(false)}
            message="Please log in to access the chat feature."
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Sign In to Chat
            </motion.button>
          </ProtectedAction>
          <div className="mt-4">
            <Link
              to="/doctors"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Professionals
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col"
    >
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/doctors"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Professionals</span>
          </Link>
          <h1 className="text-lg font-semibold text-white">Secure Support Chat</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Chat List */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 flex flex-col hidden md:flex"
        >
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-5 w-5" />
              <h2 className="font-semibold">Available Support</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {doctorsData.map((doctor) => {
              const chatHistory = getChatHistory(doctor.id.toString());
              const hasHistory = chatHistory && chatHistory.messages.length > 0;
              
              return (
                <motion.div
                  key={doctor.id}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={() => setSelectedChatId(doctor.id)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${
                    selectedChatId === doctor.id ? 'bg-white/10 border-l-4 border-l-teal-400' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {doctor.name.charAt(0)}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${statusColors[doctor.status as keyof typeof statusColors]} border-2 border-gray-900`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{doctor.name}</h3>
                      <p className="text-gray-400 text-sm capitalize">{doctor.status}</p>
                      {hasHistory && (
                        <p className="text-teal-400 text-xs">
                          {chatHistory.messages.length} messages
                        </p>
                      )}
                    </div>
                    {selectedChatId === doctor.id && (
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Emergency Notice */}
          <div className="p-4 bg-red-500/10 border-t border-red-500/20">
            <div className="text-red-400 text-sm">
              <p className="font-semibold mb-1">Crisis Support</p>
              <p>If you're in immediate danger, call 988 or visit your nearest emergency room.</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <ChatBox
            supporterName={doctorsData.find(d => d.id === selectedChatId)?.name || currentDoctor.name}
            supporterId={selectedChatId.toString()}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Chat;