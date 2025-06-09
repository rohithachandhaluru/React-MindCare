import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, BookOpen, MessageCircle, Phone, Mail, Users, X, Send, Play, ChevronDown, ChevronUp } from 'lucide-react';

const Support = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [emailForm, setEmailForm] = useState({ name: '', subject: '', message: '' });
  const [forumForm, setForumForm] = useState({ name: '', email: '', topic: '' });
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "from-blue-500 to-indigo-500",
      onClick: () => setActiveModal('chat')
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      action: "Call Now",
      color: "from-green-500 to-teal-500",
      onClick: () => {
        setConnectionMessage('📞 Connecting you to support... (simulation)');
        setTimeout(() => setConnectionMessage(''), 3000);
      }
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond quickly",
      action: "Send Email",
      color: "from-purple-500 to-pink-500",
      onClick: () => setActiveModal('email')
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      action: "Join Forum",
      color: "from-orange-500 to-red-500",
      onClick: () => setActiveModal('forum')
    }
  ];

  const helpArticles = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      articles: [
        'Creating your account',
        'Finding the right therapist',
        'Your first session',
        'Understanding our platform'
      ]
    },
    {
      id: 'chat-features',
      title: 'Using Chat Features',
      articles: [
        'Starting a conversation',
        'Chat privacy and security',
        'Emergency protocols',
        'Session scheduling'
      ]
    },
    {
      id: 'video-sessions',
      title: 'Video Sessions',
      articles: [
        'Camera and microphone setup',
        'Connection troubleshooting',
        'Screen sharing',
        'Recording sessions'
      ]
    }
  ];

  const tutorials = [
    { title: 'Getting Started with MindCare', duration: '3:45' },
    { title: 'How to Schedule Your First Session', duration: '2:30' },
    { title: 'Using the Chat Feature', duration: '4:15' },
    { title: 'Privacy and Security Features', duration: '5:20' }
  ];

  const handleChatSend = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, `You: ${newMessage}`]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const responses = [
          'Support Bot: I\'m here to help! How can I assist you today?',
          'Support Bot: Thank you for reaching out. Let me connect you with the right resources.',
          'Support Bot: I understand your concern. Our team will get back to you shortly.',
          'Support Bot: Is there anything specific you\'d like help with?'
        ];
        setChatMessages(prev => [...prev, responses[Math.floor(Math.random() * responses.length)]]);
      }, 1000);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Email sent successfully! We\'ll respond within 24 hours.');
    setEmailForm({ name: '', subject: '', message: '' });
    setActiveModal(null);
  };

  const handleForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Welcome to the MindCare community! Check your email for confirmation.');
    setForumForm({ name: '', email: '', topic: '' });
    setActiveModal(null);
  };

  const faqItems = [
    {
      question: "How do I get started with MindCare?",
      answer: "Simply create an account, browse our professionals, and start a conversation with someone who matches your needs."
    },
    {
      question: "Is my information secure and private?",
      answer: "Yes, all communications are encrypted and we follow strict HIPAA compliance guidelines to protect your privacy."
    },
    {
      question: "What if I'm having a mental health crisis?",
      answer: "If you're in immediate danger, call 988 (Suicide & Crisis Lifeline) or 911. Our platform is for ongoing support, not emergency situations."
    },
    {
      question: "How much does MindCare cost?",
      answer: "We offer various pricing plans to make mental health support accessible. Many basic features are free, with premium options available."
    },
    {
      question: "Can I choose my therapist or counselor?",
      answer: "Absolutely! You can browse profiles, read bios, and choose the professional who feels like the best fit for you."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-xl text-gray-300">
            We're here to help you every step of the way
          </p>
        </motion.div>

        {/* Connection Message */}
        {connectionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-4 border border-green-500/30 mb-8 text-center"
          >
            <p className="text-white font-medium">{connectionMessage}</p>
          </motion.div>
        )}

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-500/30 mb-12 text-center"
        >
          <h2 className="text-xl font-bold text-red-400 mb-2">Crisis Support Available 24/7</h2>
          <p className="text-white mb-4">
            If you're experiencing a mental health crisis or having thoughts of self-harm:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:988" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Call 988 - Crisis Lifeline
            </a>
            <a href="sms:741741" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Text 741741 - Crisis Text Line
            </a>
          </div>
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">How Can We Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{option.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={option.onClick}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
                >
                  {option.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Documentation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpandedHelp(expandedHelp ? null : 'all')}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              View Help Docs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('tutorials')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Watch Tutorials
            </motion.button>
          </div>

          {/* Help Articles Accordion */}
          <AnimatePresence>
            {expandedHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {helpArticles.map((category) => (
                  <div key={category.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
                    <div className="space-y-2">
                      {category.articles.map((article, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <span className="text-gray-300 hover:text-white transition-colors">{article}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center space-x-2">
            <HelpCircle className="h-8 w-8 text-teal-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
        >
          <BookOpen className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('contact')}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('forum')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Community Forum
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {activeModal === 'chat' && 'Live Chat Support'}
                  {activeModal === 'email' && 'Email Support'}
                  {activeModal === 'forum' && 'Join Community Forum'}
                  {activeModal === 'tutorials' && 'Video Tutorials'}
                  {activeModal === 'contact' && 'Contact Support'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Chat Modal */}
              {activeModal === 'chat' && (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 h-64 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-400 text-center">Start a conversation...</p>
                    ) : (
                      chatMessages.map((msg, index) => (
                        <div key={index} className="mb-2 p-2 bg-white/10 rounded text-white text-sm">
                          {msg}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleChatSend}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Email Modal */}
              {activeModal === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={emailForm.message}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Send Email
                  </motion.button>
                </form>
              )}

              {/* Forum Modal */}
              {activeModal === 'forum' && (
                <form onSubmit={handleForumSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={forumForm.name}
                    onChange={(e) => setForumForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={forumForm.email}
                    onChange={(e) => setForumForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <select
                    value={forumForm.topic}
                    onChange={(e) => setForumForm(prev => ({ ...prev, topic: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="" className="bg-gray-800">Select your main interest</option>
                    <option value="anxiety" className="bg-gray-800">Anxiety Support</option>
                    <option value="depression" className="bg-gray-800">Depression Support</option>
                    <option value="general" className="bg-gray-800">General Mental Health</option>
                    <option value="relationships" className="bg-gray-800">Relationships</option>
                    <option value="stress" className="bg-gray-800">Stress Management</option>
                  </select>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Join Community
                  </motion.button>
                </form>
              )}

              {/* Tutorials Modal */}
              {activeModal === 'tutorials' && (
                <div className="space-y-4">
                  {tutorials.map((tutorial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{tutorial.title}</h3>
                          <p className="text-gray-400 text-sm">{tutorial.duration}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Play
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Contact Modal */}
              {activeModal === 'contact' && (
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Get in touch with our support team for immediate assistance.
                  </p>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModal('chat')}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                      Start Live Chat
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModal('email')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                      Send Email
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Support;