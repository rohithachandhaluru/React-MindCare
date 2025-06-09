import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Your privacy is our priority. Learn how we protect your information.
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
              <Shield className="h-6 w-6 text-green-400" />
              <span>Information We Collect</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We collect information to provide you with the best possible mental health support:</p>
              <ul className="space-y-2 ml-4">
                <li>• Account information (email, username)</li>
                <li>• Communication data (chat messages, session notes)</li>
                <li>• Usage data (login times, features used)</li>
                <li>• Device information (browser type, IP address)</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Lock className="h-6 w-6 text-blue-400" />
              <span>How We Protect Your Data</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We employ industry-standard security measures:</p>
              <ul className="space-y-2 ml-4">
                <li>• End-to-end encryption for all communications</li>
                <li>• Secure servers with regular security audits</li>
                <li>• HIPAA-compliant data handling procedures</li>
                <li>• Limited access on a need-to-know basis</li>
                <li>• Regular security training for all staff</li>
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
              <Eye className="h-6 w-6 text-purple-400" />
              <span>How We Use Your Information</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>Your information is used solely to provide mental health services:</p>
              <ul className="space-y-2 ml-4">
                <li>• Connecting you with appropriate mental health professionals</li>
                <li>• Maintaining continuity of care</li>
                <li>• Improving our services and user experience</li>
                <li>• Ensuring platform safety and security</li>
                <li>• Complying with legal and regulatory requirements</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-yellow-400" />
              <span>Your Rights</span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="space-y-2 ml-4">
                <li>• Right to access your personal information</li>
                <li>• Right to correct inaccurate information</li>
                <li>• Right to delete your account and data</li>
                <li>• Right to data portability</li>
                <li>• Right to opt-out of certain data uses</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="text-gray-300">
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="space-y-2">
                <li>Email: privacy@mindcare.com</li>
                <li>Phone: 1-800-MINDCARE</li>
                <li>Address: 123 Wellness Way, Suite 100, Mental Health City, MH 12345</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30 text-center"
          >
            <p className="text-white text-sm">
              Last updated: December 2024 | This policy may be updated periodically to reflect changes in our practices.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;