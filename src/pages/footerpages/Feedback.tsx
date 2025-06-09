import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, ThumbsUp, ThumbsDown, MessageSquare, Lightbulb, CheckCircle } from 'lucide-react';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const feedbackCategories = [
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'from-blue-500 to-indigo-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
    { id: 'bug', label: 'Bug Report', icon: ThumbsDown, color: 'from-red-500 to-pink-500' },
    { id: 'praise', label: 'Compliment', icon: ThumbsUp, color: 'from-green-500 to-teal-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
      setRating(0);
      setFeedbackType('general');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getPlaceholderText = () => {
    switch (feedbackType) {
      case 'bug':
        return "Please describe the bug you encountered, including steps to reproduce it...";
      case 'feature':
        return "Describe the feature you'd like to see and how it would help you...";
      case 'praise':
        return "Tell us what you loved about your experience...";
      default:
        return "Share your thoughts, suggestions, or concerns...";
    }
  };

  const getRatingText = () => {
    switch (rating) {
      case 0: return "Click a star to rate";
      case 1: return "Poor - We need to improve";
      case 2: return "Fair - Some issues to address";
      case 3: return "Good - Generally satisfied";
      case 4: return "Very Good - Mostly positive experience";
      case 5: return "Excellent - Exceeded expectations";
      default: return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Share Your Feedback</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your feedback helps us improve MindCare and better serve our community. We value every suggestion, concern, and compliment.
          </p>
        </motion.div>

        {!isSubmitted ? (
          <>
            {/* Feedback Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">What type of feedback do you have?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {feedbackCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFeedbackType(category.id);
                      setFormData(prev => ({ ...prev, category: category.id }));
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      feedbackType === category.id
                        ? 'bg-white/20 border-white/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Rating Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center">How would you rate your overall experience?</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              <p className="text-center text-gray-300 text-sm">
                {getRatingText()}
              </p>
            </motion.div>

            {/* Feedback Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="Brief summary of your feedback"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={getPlaceholderText()}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  <span>Submit Feedback</span>
                </motion.button>
              </form>
            </motion.div>
          </>
        ) : (
          /* Thank You Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Thank You for Your Feedback!</h2>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Your input helps us create a better experience for everyone in our community. 
              We review all feedback and will respond if you've provided contact information.
            </p>
            <p className="text-gray-400">
              This form will reset automatically in a few seconds.
            </p>
          </motion.div>
        )}

        {/* Additional Information */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30 text-center"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">We Value Your Voice</h3>
            <p className="text-gray-300">
              Every piece of feedback helps us improve MindCare. Whether it's a suggestion, bug report, or just letting us know what's working well, 
              we appreciate you taking the time to help us serve our community better.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Feedback;