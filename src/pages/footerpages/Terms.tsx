import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const Terms = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using MindCare
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-400" />
              <span>Acceptance of Terms</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                By accessing and using MindCare, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span>Service Description</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>MindCare provides:</p>
              <ul className="space-y-2 ml-4">
                <li>• Access to licensed mental health professionals</li>
                <li>• Anonymous chat and support services</li>
                <li>• Crisis intervention resources</li>
                <li>• Educational content and motivational resources</li>
                <li>• Peer support community features</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <span>Important Limitations</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>Please understand that:</p>
              <ul className="space-y-2 ml-4">
                <li>• This service is not a substitute for emergency medical care</li>
                <li>• In crisis situations, call 988 or emergency services immediately</li>
                <li>• We do not provide medical diagnoses or prescriptions</li>
                <li>• Sessions are for support and guidance, not medical treatment</li>
                <li>• We reserve the right to contact emergency services if necessary</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
            <div className="text-gray-300 space-y-4">
              <p>As a user, you agree to:</p>
              <ul className="space-y-2 ml-4">
                <li>• Provide accurate information about yourself</li>
                <li>• Treat all professionals and users with respect</li>
                <li>• Not share login credentials with others</li>
                <li>• Report any concerning behavior or content</li>
                <li>• Follow our community guidelines</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <XCircle className="h-6 w-6 text-red-400" />
              <span>Prohibited Uses</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>You may not use our service to:</p>
              <ul className="space-y-2 ml-4">
                <li>• Harass, abuse, or harm other users or professionals</li>
                <li>• Share inappropriate or explicit content</li>
                <li>• Attempt to obtain medical prescriptions or diagnoses</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Impersonate others or provide false information</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We reserve the right to terminate or suspend access to our service immediately, 
                without prior notice or liability, for any reason whatsoever, including without 
                limitation if you breach the Terms.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-6 border border-red-500/30 text-center"
          >
            <p className="text-white text-sm">
              Last updated: December 2024 | These terms may be updated periodically. 
              Continued use of the service constitutes acceptance of any changes.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;