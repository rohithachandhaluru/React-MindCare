import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Shield, Users, Sparkles } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Welcome Message for Logged In Users */}
              {currentUser && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl border border-teal-500/30"
                >
                  <p className="text-xl text-white">
                    Welcome back, <span className="text-teal-400 font-semibold">{currentUser.name}</span>! 
                    We're glad you\'re here. 💙
                  </p>
                </motion.div>
              )}

              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'linear-gradient(-45deg, #14b8a6, #8b5cf6, #ec4899, #14b8a6)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Mental Health
                <br />
                <span className="text-white">Matters</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Connect with caring professionals and find the support you deserve. 
                Your journey to wellness starts here, in a safe and confidential space.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/doctors">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg text-lg"
                  >
                    <span>Start Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                
                <Link to="/crisis">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg"
                  >
                    <span>Crisis Support</span>
                    <Heart className="h-5 w-5 text-red-400" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose MindCare?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We provide a safe, supportive environment where you can find the help you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Confidential",
                description: "Your privacy is our top priority. All conversations are secure and private.",
                color: "from-green-400 to-teal-400"
              },
              {
                icon: Users,
                title: "Professional Support",
                description: "Connect with licensed therapists, counselors, and trained volunteers.",
                color: "from-blue-400 to-indigo-400"
              },
              {
                icon: Sparkles,
                title: "24/7 Availability",
                description: "Support is available whenever you need it, day or night.",
                color: "from-pink-400 to-purple-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-pink-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                You Don't Have to Face This Alone
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Take the first step towards better mental health. Our community of caring professionals is here to support you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/doctors">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg text-lg"
                  >
                    Find Support Now
                  </motion.button>
                </Link>
                <Link to="/motivation">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg"
                  >
                    Daily Motivation
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;