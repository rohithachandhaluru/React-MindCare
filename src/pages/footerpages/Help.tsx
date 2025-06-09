import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Video, MessageCircle, Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const helpCategories = [
    {
      id: 'getting-started',
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using MindCare",
      articles: [
        {
          title: "Creating your account",
          content: "To create your MindCare account, visit our homepage and click 'Sign Up'. You'll need to provide a valid email address and create a secure password. After verification, you can complete your profile with basic information to help us match you with the right support professionals."
        },
        {
          title: "Finding the right therapist",
          content: "Use our advanced filtering system to find professionals based on specialization, location, availability, and languages spoken. Read their profiles, check their credentials, and don't hesitate to reach out with questions before booking your first session."
        },
        {
          title: "Your first session",
          content: "Your first session is about getting to know each other. Come prepared with any questions or concerns you'd like to discuss. Remember, it's normal to feel nervous - your therapist is there to create a safe, comfortable environment for you."
        },
        {
          title: "Understanding our platform",
          content: "MindCare offers multiple ways to connect: secure messaging, video calls, and phone sessions. All communications are encrypted and HIPAA-compliant. You can schedule sessions, access resources, and track your progress all in one place."
        }
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 'chat-features',
      icon: MessageCircle,
      title: "Using Chat Features",
      description: "Make the most of our communication tools",
      articles: [
        {
          title: "Starting a conversation",
          content: "To start a conversation, navigate to your chosen professional's profile and click 'Start Chat'. You can send text messages, share files (when appropriate), and even schedule video calls directly through the chat interface."
        },
        {
          title: "Chat privacy and security",
          content: "All chats are end-to-end encrypted and stored securely. Only you and your chosen professional can see your conversations. We never share your information with third parties without your explicit consent."
        },
        {
          title: "Emergency protocols",
          content: "If you're experiencing a crisis, don't rely on chat alone. Call 988 for immediate support or 911 for emergencies. Our professionals are trained to recognize crisis situations and will guide you to appropriate immediate help."
        },
        {
          title: "Session scheduling",
          content: "Use the calendar feature in your chat to schedule video or phone sessions. You'll receive confirmation emails and reminders. You can reschedule or cancel up to 24 hours before your appointment without penalty."
        }
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      id: 'video-sessions',
      icon: Video,
      title: "Video Sessions",
      description: "Technical help for video calls",
      articles: [
        {
          title: "Camera and microphone setup",
          content: "Before your first video session, test your camera and microphone. Ensure you have a stable internet connection and are in a private, well-lit space. We recommend using headphones for better audio quality and privacy."
        },
        {
          title: "Connection troubleshooting",
          content: "If you experience connection issues, try refreshing your browser, checking your internet speed, or switching to a different device. Our support team is available to help with technical difficulties during your session."
        },
        {
          title: "Screen sharing",
          content: "Some therapists may use screen sharing for educational materials or worksheets. You'll always be asked for permission before any screen sharing begins. This feature is optional and never required for your sessions."
        },
        {
          title: "Recording sessions",
          content: "Sessions are not recorded by default. If you and your therapist agree that recording would be beneficial, both parties must consent. You have full control over any recordings and can request deletion at any time."
        }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 'account-management',
      icon: Download,
      title: "Account Management",
      description: "Manage your profile and settings",
      articles: [
        {
          title: "Updating your profile",
          content: "Keep your profile current by updating your contact information, preferences, and goals. This helps us provide better matches and more personalized support. You can update your profile anytime from your account settings."
        },
        {
          title: "Privacy settings",
          content: "Control who can see your information and how you're contacted. You can adjust notification preferences, visibility settings, and communication preferences. Your privacy is always in your control."
        },
        {
          title: "Billing and payments",
          content: "View your billing history, update payment methods, and manage your subscription from your account dashboard. We accept major credit cards and offer flexible payment plans for those who need them."
        },
        {
          title: "Deleting your account",
          content: "If you need to delete your account, contact our support team. We'll guide you through the process and ensure all your data is properly removed according to your preferences and legal requirements."
        }
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const tutorials = [
    { title: 'Getting Started with MindCare', duration: '3:45' },
    { title: 'How to Schedule Your First Session', duration: '2:30' },
    { title: 'Using the Chat Feature', duration: '4:15' },
    { title: 'Privacy and Security Features', duration: '5:20' }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleArticle = (articleTitle: string) => {
    setExpandedArticle(expandedArticle === articleTitle ? null : articleTitle);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-gray-300 mb-8">
            Find answers to your questions and learn how to make the most of MindCare
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Browse by Category</h2>
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center justify-between p-6 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{category.title}</h3>
                      <p className="text-gray-300 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-3">
                        {category.articles.map((article, articleIndex) => (
                          <motion.div
                            key={article.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: articleIndex * 0.1 }}
                            className="bg-white/5 rounded-lg border border-white/10"
                          >
                            <motion.div
                              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              onClick={() => toggleArticle(article.title)}
                              className="flex items-center justify-between p-4 cursor-pointer"
                            >
                              <span className="text-gray-300 hover:text-white transition-colors font-medium">
                                {article.title}
                              </span>
                              <motion.div
                                animate={{ rotate: expandedArticle === article.title ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </motion.div>
                            </motion.div>

                            <AnimatePresence>
                              {expandedArticle === article.title && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="px-4 pb-4"
                                >
                                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-teal-400">
                                    <p className="text-gray-300 leading-relaxed">{article.content}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        View All Articles
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-8 border border-teal-500/30 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/support'}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Community Forum
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Help;