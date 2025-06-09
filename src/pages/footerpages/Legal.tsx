import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileText, Shield, AlertTriangle, X, Send, Copy, Check } from 'lucide-react';

const Legal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [legalForm, setLegalForm] = useState({ name: '', issueType: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const legalSections = [
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Our terms and conditions for using MindCare services",
      link: "/terms",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we protect and handle your personal information",
      link: "/privacy",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Scale,
      title: "Community Guidelines",
      description: "Rules and expectations for our community",
      link: "/guidelines",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      description: "Important information about our services",
      link: "#disclaimer",
      color: "from-orange-500 to-red-500"
    }
  ];

  const issueTypes = [
    'Terms of Service Question',
    'Privacy Concern',
    'Data Request',
    'Copyright Issue',
    'Compliance Question',
    'Other Legal Matter'
  ];

  const handleLegalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveModal(null);
      setLegalForm({ name: '', issueType: '', message: '' });
    }, 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('legal@mindcare.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Legal Information</h1>
          <p className="text-xl text-gray-300">
            Important legal documents and policies governing the use of MindCare
          </p>
        </motion.div>

        {/* Legal Sections */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {legalSections.map((section, index) => (
            <motion.a
              key={section.title}
              href={section.link}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <section.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
              <p className="text-gray-300">{section.description}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* Disclaimer Section */}
        <motion.div
          id="disclaimer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <span>Medical Disclaimer</span>
          </h2>
          <div className="text-gray-300 space-y-4">
            <p>
              <strong>Important:</strong> MindCare is not a substitute for professional medical advice, diagnosis, or treatment. 
              The information and services provided through our platform are for educational and support purposes only.
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Always seek the advice of qualified mental health professionals</li>
              <li>• Never disregard professional medical advice because of something you read on MindCare</li>
              <li>• If you think you may have a medical emergency, call your doctor or 911 immediately</li>
              <li>• MindCare does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information</li>
            </ul>
          </div>
        </motion.div>

        {/* Compliance Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Compliance & Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">HIPAA Compliance</h3>
              <p className="text-gray-300 text-sm">
                We follow strict HIPAA guidelines to protect your health information and ensure confidentiality.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Security</h3>
              <p className="text-gray-300 text-sm">
                All communications are encrypted using industry-standard security protocols.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Professional Standards</h3>
              <p className="text-gray-300 text-sm">
                Our mental health professionals are licensed and follow ethical guidelines.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Accessibility</h3>
              <p className="text-gray-300 text-sm">
                We strive to make our platform accessible to users with disabilities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-6 border border-teal-500/30 text-center"
        >
          <h2 className="text-xl font-bold text-white mb-4">Legal Questions?</h2>
          <p className="text-gray-300 mb-4">
            If you have questions about our legal policies or need clarification on any terms:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('legal')}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Contact Legal Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyEmail}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              <span>{copied ? 'Copied!' : 'legal@mindcare.com'}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Legal Contact Modal */}
      <AnimatePresence>
        {activeModal === 'legal' && (
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
                <h2 className="text-2xl font-bold text-white">Legal Inquiry</h2>
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
                <form onSubmit={handleLegalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={legalForm.name}
                      onChange={(e) => setLegalForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Issue Type</label>
                    <select
                      value={legalForm.issueType}
                      onChange={(e) => setLegalForm(prev => ({ ...prev, issueType: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="" className="bg-gray-800">Select issue type</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type} className="bg-gray-800">{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      value={legalForm.message}
                      onChange={(e) => setLegalForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                      placeholder="Please describe your legal inquiry in detail..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Submit Inquiry</span>
                  </motion.button>
                </form>
              ) : (
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
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Inquiry Submitted</h3>
                  <p className="text-gray-300">
                    Thank you for contacting our legal team. We'll review your inquiry and respond within 2-3 business days.
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

export default Legal;