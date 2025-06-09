import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, User, FileText, CreditCard, MessageCircle, Trash2, Eye } from 'lucide-react';
import { getCurrentUser, updateCurrentUser, deleteChatHistory } from '../utils/auth';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(() => {
    const user = getCurrentUser();
    return {
      name: user?.name || '',
      email: user?.email || '',
      profilePicture: user?.profilePicture || '',
      problemDescription: user?.problemDescription || ''
    };
  });

  const user = getCurrentUser();
  const paymentHistory = user?.paymentHistory || [];
  const chatHistory = user?.chatHistory || [];

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileData(prev => ({ ...prev, profilePicture: result }));
        updateCurrentUser({ profilePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProblemDescriptionSave = () => {
    updateCurrentUser({ problemDescription: profileData.problemDescription });
  };

  const handleDeleteChat = (doctorId: string) => {
    deleteChatHistory(doctorId);
    window.location.reload(); // Refresh to update the UI
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'chats', label: 'Chat History', icon: MessageCircle }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-gray-900/95 backdrop-blur-lg rounded-3xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">My Profile</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-teal-400 border-b-2 border-teal-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Profile Picture */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-teal-400 to-indigo-400 flex items-center justify-center">
                        {profileData.profilePicture ? (
                          <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-16 w-16 text-white" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-600 transition-colors">
                        <Upload className="h-5 w-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-4">{profileData.name}</h3>
                    <p className="text-gray-400">{profileData.email}</p>
                  </div>

                  {/* Problem Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Describe your concerns or what you'd like help with:
                    </label>
                    <textarea
                      value={profileData.problemDescription}
                      onChange={(e) => setProfileData(prev => ({ ...prev, problemDescription: e.target.value }))}
                      onBlur={handleProblemDescriptionSave}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Share what's on your mind, any challenges you're facing, or goals you'd like to work towards..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Payment History</h3>
                  {paymentHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No payments yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentHistory.map((payment) => (
                        <div
                          key={payment.id}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium">{payment.doctorName}</h4>
                              <p className="text-gray-400 text-sm">
                                {new Date(payment.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-teal-400 font-semibold">₹{payment.amount}</p>
                              <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Chat History Tab */}
              {activeTab === 'chats' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Chat History</h3>
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No conversations yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((chat) => (
                        <div
                          key={chat.doctorId}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{chat.doctorName}</h4>
                              <p className="text-gray-400 text-sm">
                                {chat.messages.length} messages
                              </p>
                              <p className="text-gray-500 text-xs">
                                Last activity: {new Date(chat.lastActivity).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = `/chat/${chat.doctorId}`}
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteChat(chat.doctorId)}
                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;