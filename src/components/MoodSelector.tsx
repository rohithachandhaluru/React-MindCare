import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string, quote: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [additionalInput, setAdditionalInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    {
      emoji: '😔',
      label: 'Very Low',
      value: 'very-low',
      quotes: [
        "It's okay to rest. You're doing better than you think.",
        "Your feelings are valid. Take it one moment at a time.",
        "Even the darkest nights end with sunrise. You're not alone.",
        "Healing isn't linear, and that's perfectly okay.",
        "You've survived 100% of your difficult days so far."
      ]
    },
    {
      emoji: '😐',
      label: 'Neutral',
      value: 'neutral',
      quotes: [
        "Sometimes neutral is exactly where you need to be.",
        "You're allowed to feel however you feel right now.",
        "Every feeling is temporary. You're doing just fine.",
        "Being okay is enough. You don't need to be amazing every day.",
        "Steady progress is still progress. Keep going."
      ]
    },
    {
      emoji: '🙂',
      label: 'Okay',
      value: 'okay',
      quotes: [
        "You're doing great! Small steps lead to big changes.",
        "Your positive energy is building momentum.",
        "Keep nurturing this feeling. You deserve good moments.",
        "This is a beautiful place to be. Enjoy this moment.",
        "Your resilience is showing. Keep moving forward."
      ]
    },
    {
      emoji: '😊',
      label: 'Happy',
      value: 'happy',
      quotes: [
        "Your vibe is inspiring. Keep spreading that light!",
        "Happiness looks beautiful on you. Embrace this feeling.",
        "You're radiating positive energy. The world needs more of this.",
        "This joy you're feeling? You've earned every bit of it.",
        "Your smile has the power to brighten someone's day."
      ]
    },
    {
      emoji: '😍',
      label: 'Excellent',
      value: 'excellent',
      quotes: [
        "You're absolutely glowing! This energy is contagious.",
        "What an amazing day to be you! Keep shining bright.",
        "Your enthusiasm is a gift to everyone around you.",
        "You're living proof that beautiful moments exist.",
        "This is your moment to soar. You're unstoppable!"
      ]
    }
  ];

  const moodFactors = [
    'Stress',
    'Sleep',
    'Work',
    'Family',
    'Health',
    'Relationships',
    'Weather',
    'Exercise',
    'Social Media',
    'Finances'
  ];

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const generatePersonalizedQuote = (mood: any) => {
    let baseQuote = mood.quotes[Math.floor(Math.random() * mood.quotes.length)];
    
    // Customize based on selected factors
    if (selectedFactors.includes('Stress')) {
      baseQuote += " Remember to breathe and take things one step at a time.";
    }
    if (selectedFactors.includes('Sleep')) {
      baseQuote += " Good rest is essential for your wellbeing.";
    }
    if (selectedFactors.includes('Work')) {
      baseQuote += " Your worth isn't defined by your productivity.";
    }
    if (selectedFactors.includes('Family')) {
      baseQuote += " Family relationships can be complex, and that's okay.";
    }
    
    // Add personal touch if additional input provided
    if (additionalInput.trim()) {
      baseQuote += " Your unique situation matters, and you're handling it with courage.";
    }
    
    return baseQuote;
  };

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.value);
    setIsGenerating(true);

    setTimeout(() => {
      const personalizedQuote = generatePersonalizedQuote(mood);
      onMoodSelect(mood.value, personalizedQuote);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        How are you feeling today?
      </h2>
      
      {/* Mood Selection */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood.value)}
            disabled={isGenerating}
            className={`relative p-4 rounded-2xl transition-all duration-300 ${
              selectedMood === mood.value
                ? 'bg-gradient-to-r from-teal-500/30 to-indigo-500/30 border-2 border-teal-400 shadow-lg shadow-teal-500/25'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-white text-sm font-medium">{mood.label}</div>
            
            {selectedMood === mood.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Mood Factors */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-3">
            What's affecting your mood? (Select all that apply)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {moodFactors.map((factor) => (
              <motion.button
                key={factor}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFactorToggle(factor)}
                className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFactors.includes(factor)
                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400 text-pink-300'
                    : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                }`}
              >
                {factor}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Additional Input */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-3">
            Anything else you'd like to share?
          </h3>
          <textarea
            value={additionalInput}
            onChange={(e) => setAdditionalInput(e.target.value)}
            placeholder="Optional: Share what's on your mind..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
            rows={3}
          />
        </motion.div>
      )}

      {/* Generate Button */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const mood = moods.find(m => m.value === selectedMood);
              if (mood) handleMoodSelect(mood);
            }}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-lg mx-auto"
          >
            <motion.div
              animate={{ rotate: isGenerating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="h-5 w-5" />
            </motion.div>
            <span>
              {isGenerating ? 'Creating your personalized motivation...' : 'Generate My Motivation'}
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;