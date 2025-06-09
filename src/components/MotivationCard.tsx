import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, Star } from 'lucide-react';

const MotivationCard = () => {
  const motivationalQuotes = [
    {
      text: "You are stronger than you think.",
      author: "MindCare Community",
      category: "Strength"
    },
    {
      text: "Keep going. You're doing great.",
      author: "Your Inner Voice",
      category: "Encouragement"
    },
    {
      text: "Every small step forward is progress worth celebrating.",
      author: "MindCare Wisdom",
      category: "Progress"
    },
    {
      text: "Your feelings are valid, and it's okay to not be okay sometimes.",
      author: "Mental Health Advocate",
      category: "Validation"
    },
    {
      text: "You've survived 100% of your worst days. You're doing amazing.",
      author: "Resilience Reminder",
      category: "Resilience"
    },
    {
      text: "Healing isn't linear, and that's perfectly normal.",
      author: "Recovery Journey",
      category: "Healing"
    },
    {
      text: "You deserve love, kindness, and compassion - especially from yourself.",
      author: "Self-Care Guide",
      category: "Self-Love"
    },
    {
      text: "Tomorrow is a new day with new possibilities.",
      author: "Hope Keeper",
      category: "Hope"
    },
    {
      text: "Your story isn't over yet. Keep writing.",
      author: "Life Author",
      category: "Purpose"
    },
    {
      text: "You are not alone in this journey. Support is always available.",
      author: "Community Care",
      category: "Support"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [isLoading, setIsLoading] = useState(false);

  const getNewQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
      setIsLoading(false);
    }, 800);
  };

  const categoryColors = {
    Strength: 'from-red-400 to-pink-400',
    Encouragement: 'from-green-400 to-teal-400',
    Progress: 'from-blue-400 to-indigo-400',
    Validation: 'from-purple-400 to-pink-400',
    Resilience: 'from-orange-400 to-red-400',
    Healing: 'from-teal-400 to-cyan-400',
    'Self-Love': 'from-pink-400 to-rose-400',
    Hope: 'from-yellow-400 to-orange-400',
    Purpose: 'from-indigo-400 to-purple-400',
    Support: 'from-green-400 to-blue-400',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Glowing background effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[currentQuote.category as keyof typeof categoryColors]} rounded-3xl blur-xl opacity-20 animate-pulse`} />
        
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-r from-teal-400 to-pink-400 rounded-full flex items-center justify-center"
            >
              <Heart className="h-8 w-8 text-white" />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center mb-4">
            <span className={`px-4 py-2 bg-gradient-to-r ${categoryColors[currentQuote.category as keyof typeof categoryColors]} text-white text-sm font-medium rounded-full shadow-lg`}>
              {currentQuote.category}
            </span>
          </div>

          {/* Quote Text */}
          <motion.div
            key={currentQuote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-4">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-lg text-gray-300 font-medium">
              — {currentQuote.author}
            </cite>
          </motion.div>

          {/* Decorative Stars */}
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity 
                }}
              >
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>

          {/* Get New Quote Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={getNewQuote}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
            >
              <motion.div
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{ duration: 0.8, repeat: isLoading ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.div>
              <span>
                {isLoading ? 'Finding inspiration...' : 'Get Another Motivation'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MotivationCard;