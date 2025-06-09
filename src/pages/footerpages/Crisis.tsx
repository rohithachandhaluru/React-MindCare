import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Globe, Heart, AlertTriangle, Clock, MapPin, Brain } from 'lucide-react';
import LocalResourcesModal from '../../components/LocalResourcesModal';
import MentalHealthInfoModal from '../../components/MentalHealthInfoModal';

const Crisis = () => {
  const [isLocalResourcesOpen, setIsLocalResourcesOpen] = useState(false);
  const [isMentalHealthInfoOpen, setIsMentalHealthInfoOpen] = useState(false);

  const crisisResources = [
    {
      title: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 free and confidential support for people in distress",
      icon: Phone,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      icon: MessageCircle,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "24/7 confidential support for domestic violence survivors",
      icon: Heart,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service for mental health and substance abuse",
      icon: Globe,
      color: "from-green-500 to-teal-500"
    }
  ];

  const warningSignsData = [
    "Talking about wanting to die or hurt oneself",
    "Looking for ways to kill oneself",
    "Talking about feeling hopeless or having no purpose",
    "Talking about feeling trapped or in unbearable pain",
    "Talking about being a burden to others",
    "Increasing use of alcohol or drugs",
    "Acting anxious, agitated, or reckless",
    "Sleeping too little or too much",
    "Withdrawing or feeling isolated",
    "Showing rage or talking about seeking revenge",
    "Displaying extreme mood swings"
  ];

  const immediateSteps = [
    {
      step: "1",
      title: "Stay with the person",
      description: "Don't leave them alone if possible"
    },
    {
      step: "2",
      title: "Listen without judgment",
      description: "Let them express their feelings"
    },
    {
      step: "3",
      title: "Call for help",
      description: "Contact crisis services or emergency services"
    },
    {
      step: "4",
      title: "Remove means of harm",
      description: "Safely remove any potential weapons or harmful substances"
    },
    {
      step: "5",
      title: "Follow up",
      description: "Continue to check in and provide ongoing support"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Emergency Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Crisis Resources</h1>
          <p className="text-xl text-gray-300">
            If you or someone you know is in immediate danger, don't wait - get help now
          </p>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-8 border border-red-500/30 mb-12 text-center"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center justify-center space-x-2">
            <Clock className="h-6 w-6" />
            <span>Immediate Help Available 24/7</span>
          </h2>
          <p className="text-white text-lg mb-6">
            If you're having thoughts of suicide or self-harm, or if someone you know is in immediate danger:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="tel:911" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors">
              Call 911
              <div className="text-sm opacity-90">Emergency Services</div>
            </a>
            <a href="tel:988" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors">
              Call 988
              <div className="text-sm opacity-90">Suicide Prevention Lifeline</div>
            </a>
            <a href="sms:741741" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors">
              Text 741741
              <div className="text-sm opacity-90">Crisis Text Line</div>
            </a>
          </div>
        </motion.div>

        {/* Crisis Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Crisis Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crisisResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-2xl font-bold text-red-400 mb-2">{resource.phone}</p>
                    <p className="text-gray-300 text-sm">{resource.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Additional Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Find Local Resources */}
            <motion.button
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLocalResourcesOpen(true)}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-3">Find Local Resources</h3>
                  <p className="text-gray-300 mb-4">
                    Discover mental health centers, hospitals, and support services in your area with contact information and availability.
                  </p>
                  <div className="text-teal-400 font-medium">
                    Click to explore local support →
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Learn More About Mental Health */}
            <motion.button
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMentalHealthInfoOpen(true)}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-3">Learn More About Mental Health</h3>
                  <p className="text-gray-300 mb-4">
                    Understand anxiety, depression, and other mental health topics with practical management strategies and insights.
                  </p>
                  <div className="text-purple-400 font-medium">
                    Click to learn more →
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Warning Signs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Warning Signs to Watch For</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 mb-6 text-center">
              If you notice these signs in yourself or someone else, it's important to seek help immediately:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warningSignsData.map((sign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-start space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{sign}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How to Help */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">How to Help Someone in Crisis</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {immediateSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-8 border border-teal-500/30 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Remember: You Are Not Alone</h2>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Crisis situations are temporary, but the pain can feel overwhelming. Professional help is available, 
            and there are people who care about you and want to help. Reaching out for support is a sign of strength, not weakness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLocalResourcesOpen(true)}
              className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Find Local Resources
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMentalHealthInfoOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Learn More About Mental Health
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <LocalResourcesModal
        isOpen={isLocalResourcesOpen}
        onClose={() => setIsLocalResourcesOpen(false)}
      />
      
      <MentalHealthInfoModal
        isOpen={isMentalHealthInfoOpen}
        onClose={() => setIsMentalHealthInfoOpen(false)}
      />
    </motion.div>
  );
};

export default Crisis;