import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Award } from 'lucide-react';

const About = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About MindCare</h1>
          <p className="text-xl text-gray-300">
            Your trusted companion in mental health and wellness
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
              <Heart className="h-6 w-6 text-pink-400" />
              <span>Our Mission</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At MindCare, we believe that mental health support should be accessible, confidential, and compassionate. 
              Our platform connects individuals with qualified mental health professionals and trained volunteers who are 
              dedicated to providing a safe space for healing and growth. We're committed to breaking down barriers to 
              mental health care and creating a community where everyone feels heard and supported.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="h-6 w-6 text-teal-400" />
              <span>Our Team</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our network includes licensed therapists, counselors, psychiatrists, and trained peer support volunteers. 
              Each professional on our platform has been carefully vetted and brings years of experience in mental health care.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• Licensed Clinical Psychologists</li>
              <li>• Licensed Professional Counselors</li>
              <li>• Board-Certified Psychiatrists</li>
              <li>• Certified Life Coaches</li>
              <li>• Trained Peer Support Specialists</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-400" />
              <span>Your Privacy & Safety</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We take your privacy seriously. All conversations are encrypted end-to-end, and we follow strict HIPAA 
              compliance guidelines to protect your personal information.
            </p>
            <ul className="text-gray-300 space-y-2">
              <li>• End-to-end encryption for all communications</li>
              <li>• HIPAA-compliant data handling</li>
              <li>• Anonymous chat options available</li>
              <li>• No information shared without your consent</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Award className="h-6 w-6 text-yellow-400" />
              <span>Our Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Compassion</h3>
                <p className="text-gray-300 text-sm">Every interaction is guided by empathy and understanding.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Accessibility</h3>
                <p className="text-gray-300 text-sm">Mental health support should be available to everyone.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Confidentiality</h3>
                <p className="text-gray-300 text-sm">Your privacy and trust are paramount to our service.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Excellence</h3>
                <p className="text-gray-300 text-sm">We strive for the highest standards in mental health care.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;