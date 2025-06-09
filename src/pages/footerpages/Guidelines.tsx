import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Heart, MessageCircle, AlertTriangle, CheckCircle, X, Send } from 'lucide-react';

const Guidelines = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [joinForm, setJoinForm] = useState({ username: '', email: '', reason: '' });
  const [reportForm, setReportForm] = useState({ type: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const guidelines = [
    {
      icon: Heart,
      title: "Be Kind and Respectful",
      description: "Treat all community members with compassion and understanding",
      rules: [
        "Use respectful language at all times",
        "Be patient with others who may be struggling",
        "Avoid judgment or criticism of others' experiences",
        "Respect different perspectives and backgrounds"
      ],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Maintain Privacy and Confidentiality",
      description: "Protect your own and others' personal information",
      rules: [
        "Don't share personal identifying information",
        "Respect others' privacy and anonymity",
        "Don't screenshot or share private conversations",
        "Use discretion when sharing personal experiences"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: MessageCircle,
      title: "Communicate Responsibly",
      description: "Foster healthy and supportive conversations",
      rules: [
        "Stay on topic and be constructive",
        "Avoid giving medical advice or diagnoses",
        "Share resources and support, not solutions",
        "Use trigger warnings when discussing sensitive topics"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Support the Community",
      description: "Help create a safe space for everyone",
      rules: [
        "Encourage others and celebrate progress",
        "Report concerning behavior to moderators",
        "Welcome new members warmly",
        "Share helpful resources when appropriate"
      ],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const prohibitedBehaviors = [
    "Harassment, bullying, or intimidation of any kind",
    "Sharing explicit, violent, or disturbing content",
    "Promoting self-harm or dangerous behaviors",
    "Spam, advertising, or promotional content",
    "Impersonating others or providing false information",
    "Sharing personal contact information publicly",
    "Giving medical advice or professional diagnoses",
    "Discriminatory language or hate speech"
  ];

  const reportingSteps = [
    {
      step: "1",
      title: "Document the Issue",
      description: "Take note of what happened and when"
    },
    {
      step: "2",
      title: "Use Report Feature",
      description: "Click the report button on the content or message"
    },
    {
      step: "3",
      title: "Provide Details",
      description: "Explain the situation clearly and objectively"
    },
    {
      step: "4",
      title: "Follow Up",
      description: "Our team will review and respond within 24 hours"
    }
  ];

  const incidentTypes = [
    'Harassment or Bullying',
    'Inappropriate Content',
    'Spam or Advertising',
    'Privacy Violation',
    'Medical Misinformation',
    'Hate Speech',
    'Other'
  ];

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveModal(null);
      setJoinForm({ username: '', email: '', reason: '' });
    }, 3000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveModal(null);
      setReportForm({ type: '', description: '' });
    }, 3000);
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community Guidelines</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our community guidelines help ensure MindCare remains a safe, supportive space for everyone seeking mental health support.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${guideline.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <guideline.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{guideline.title}</h3>
                    <p className="text-gray-300 text-sm">{guideline.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guideline.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start space-x-2 text-gray-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prohibited Behaviors */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <span>Prohibited Behaviors</span>
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6 text-center">
              The following behaviors are not allowed in our community and may result in account suspension or termination:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedBehaviors.map((behavior, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start space-x-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{behavior}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reporting Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">How to Report Violations</h2>
          <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
            If you encounter behavior that violates our community guidelines, please report it immediately. 
            Your reports help us maintain a safe environment for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reportingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consequences */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Enforcement and Consequences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">First Warning</h3>
                <p className="text-gray-300 text-sm">Educational message and guidance on community standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Temporary Suspension</h3>
                <p className="text-gray-300 text-sm">Account suspended for 24-72 hours depending on severity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Permanent Ban</h3>
                <p className="text-gray-300 text-sm">Account permanently removed for severe or repeated violations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-8 border border-teal-500/30 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Together We Create a Safe Space</h2>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            These guidelines exist to protect and support everyone in our community. By following them, 
            you help create an environment where people can seek help, share experiences, and heal together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('join')}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Join Our Community
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('report')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Report a Violation
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
                  {activeModal === 'join' && 'Join Our Community'}
                  {activeModal === 'report' && 'Report a Violation'}
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

              {!showSuccess ? (
                <>
                  {/* Join Community Modal */}
                  {activeModal === 'join' && (
                    <form onSubmit={handleJoinSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          value={joinForm.username}
                          onChange={(e) => setJoinForm(prev => ({ ...prev, username: e.target.value }))}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Choose a username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={joinForm.email}
                          onChange={(e) => setJoinForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Why do you want to join?</label>
                        <textarea
                          value={joinForm.reason}
                          onChange={(e) => setJoinForm(prev => ({ ...prev, reason: e.target.value }))}
                          required
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                          placeholder="Tell us about your interest in joining our community..."
                        />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                      >
                        Join Community
                      </motion.button>
                    </form>
                  )}

                  {/* Report Violation Modal */}
                  {activeModal === 'report' && (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Incident Type</label>
                        <select
                          value={reportForm.type}
                          onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="" className="bg-gray-800">Select incident type</option>
                          {incidentTypes.map((type) => (
                            <option key={type} value={type} className="bg-gray-800">{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                          value={reportForm.description}
                          onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                          placeholder="Please describe the incident in detail..."
                        />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Send className="h-5 w-5" />
                        <span>Submit Report</span>
                      </motion.button>
                    </form>
                  )}
                </>
              ) : (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {activeModal === 'join' ? 'Welcome to MindCare!' : 'Report Submitted Successfully'}
                  </h3>
                  <p className="text-gray-300">
                    {activeModal === 'join' 
                      ? 'Thank you for joining our community! Check your email for next steps.'
                      : '✅ Report submitted successfully. Our team will review and take necessary action.'
                    }
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Guidelines;