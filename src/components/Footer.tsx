import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'About': [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Support', path: '/support' },
      { name: 'Help Center', path: '/help' },
    ],
    'Resources': [
      { name: 'Crisis Resources', path: '/crisis' },
      { name: 'Mental Health Resources', path: '/resources' },
      { name: 'Community Guidelines', path: '/guidelines' },
      { name: 'Find Support', path: '/support/find' },
    ],
    'Legal': [
      { name: 'Legal Information', path: '/legal' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Feedback', path: '/feedback' },
    ],
  };

  const emergencyNumber = "988"; // National Suicide Prevention Lifeline

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-6 mb-8 border border-red-500/30"
        >
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6 text-red-400" />
            <div>
              <h3 className="text-lg font-semibold text-red-400">Emergency Support</h3>
              <p className="text-gray-300">
                If you're in crisis, call{' '}
                <a href={`tel:${emergencyNumber}`} className="text-red-400 font-bold hover:text-red-300">
                  {emergencyNumber}
                </a>{' '}
                or visit your nearest emergency room.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                MindCare
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your safe space for mental health support and community connection.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@mindcare.com</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white/10 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; 2024 MindCare. All rights reserved. Your mental health matters.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;