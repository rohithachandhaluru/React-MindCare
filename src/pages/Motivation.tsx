import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Sun } from 'lucide-react';
import MotivationCard from '../components/MotivationCard';
import MoodSelector from '../components/MoodSelector';

const Motivation = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleMoodSelect = (mood: string, quote: string) => {
    setSelectedMood(mood);
    setCurrentQuote(quote);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
            >
              <Sun className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Daily Motivation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start your day with a dose of inspiration. Share how you're feeling and get personalized motivation tailored just for you.
          </p>
        </motion.div>

        {/* Mood-Based Motivation Generator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </motion.div>

        {/* Display Selected Quote */}
        {currentQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-pink-400 rounded-3xl blur-xl opacity-20 animate-pulse" />
                
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentQuote}
                    className="mb-4"
                  >
                    <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-4">
                      "{currentQuote}"
                    </blockquote>
                    <cite className="text-lg text-gray-300 font-medium">
                      — Personalized for your mood
                    </cite>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Motivation Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <MotivationCard />
        </motion.div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Heart,
              title: "Self-Compassion",
              description: "Be kind to yourself. You're doing the best you can with what you have right now.",
              color: "from-pink-400 to-rose-400"
            },
            {
              icon: Sparkles,
              title: "Growth Mindset",
              description: "Every challenge is an opportunity to learn and grow stronger than before.",
              color: "from-purple-400 to-indigo-400"
            },
            {
              icon: Sun,
              title: "New Beginnings",
              description: "Each day is a fresh start, a new chapter in your story of resilience.",
              color: "from-yellow-400 to-orange-400"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Motivation;