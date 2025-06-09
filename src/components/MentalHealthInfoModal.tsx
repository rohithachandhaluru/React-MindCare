import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Heart, Moon, ChevronRight } from 'lucide-react';

interface MentalHealthInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MentalHealthInfoModal: React.FC<MentalHealthInfoModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    {
      id: 'anxiety',
      title: 'What is Anxiety?',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      summary: 'Understanding anxiety disorders and their symptoms',
      content: {
        definition: 'Anxiety is a natural response to stress, but when it becomes overwhelming or persistent, it may indicate an anxiety disorder.',
        symptoms: [
          'Excessive worry or fear',
          'Restlessness or feeling on edge',
          'Difficulty concentrating',
          'Physical symptoms like rapid heartbeat',
          'Sleep disturbances',
          'Avoidance of certain situations'
        ],
        management: [
          'Practice deep breathing exercises',
          'Try progressive muscle relaxation',
          'Maintain a regular sleep schedule',
          'Limit caffeine and alcohol',
          'Exercise regularly',
          'Consider professional therapy'
        ]
      }
    },
    {
      id: 'depression',
      title: 'How to Manage Depression?',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
      summary: 'Strategies for coping with depression',
      content: {
        definition: 'Depression is more than just feeling sad. It\'s a serious mental health condition that affects how you feel, think, and handle daily activities.',
        symptoms: [
          'Persistent sad or empty mood',
          'Loss of interest in activities',
          'Fatigue or decreased energy',
          'Changes in appetite or weight',
          'Sleep disturbances',
          'Feelings of worthlessness or guilt'
        ],
        management: [
          'Maintain a daily routine',
          'Stay connected with supportive people',
          'Engage in physical activity',
          'Practice mindfulness and meditation',
          'Set small, achievable goals',
          'Seek professional help when needed'
        ]
      }
    },
    {
      id: 'rest',
      title: 'Why Rest is Productive',
      icon: Moon,
      color: 'from-green-500 to-teal-500',
      summary: 'The importance of rest for mental health',
      content: {
        definition: 'Rest is not laziness—it\'s an essential component of mental health and productivity. Quality rest allows your mind and body to recover and recharge.',
        symptoms: [
          'Improved cognitive function',
          'Better emotional regulation',
          'Enhanced creativity',
          'Stronger immune system',
          'Reduced stress levels',
          'Better decision-making abilities'
        ],
        management: [
          'Prioritize 7-9 hours of sleep nightly',
          'Take regular breaks during work',
          'Practice relaxation techniques',
          'Create a restful environment',
          'Limit screen time before bed',
          'Listen to your body\'s needs'
        ]
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Brain className="h-6 w-6 text-teal-400" />
                <span>Mental Health Information</span>
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {!selectedTopic ? (
              /* Topic Selection */
              <>
                <p className="text-gray-300 mb-8">
                  Learn about common mental health topics and discover strategies for better wellbeing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topics.map((topic, index) => (
                    <motion.button
                      key={topic.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      onClick={() => setSelectedTopic(topic.id)}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-left group"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${topic.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <topic.icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">{topic.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{topic.summary}</p>
                      
                      <div className="flex items-center text-teal-400 text-sm font-medium">
                        <span>Learn more</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            ) : (
              /* Topic Detail */
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {(() => {
                  const topic = topics.find(t => t.id === selectedTopic);
                  if (!topic) return null;

                  return (
                    <>
                      <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => setSelectedTopic(null)}
                        className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
                      >
                        <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                        <span>Back to topics</span>
                      </motion.button>

                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${topic.color} rounded-2xl flex items-center justify-center`}>
                          <topic.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">{topic.title}</h3>
                      </div>

                      <div className="space-y-8">
                        {/* Definition */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-xl font-semibold text-white mb-3">Understanding</h4>
                          <p className="text-gray-300 leading-relaxed">{topic.content.definition}</p>
                        </div>

                        {/* Symptoms/Benefits */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-xl font-semibold text-white mb-4">
                            {topic.id === 'rest' ? 'Benefits' : 'Common Signs'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.content.symptoms.map((symptom, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{symptom}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Management */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-xl font-semibold text-white mb-4">
                            {topic.id === 'rest' ? 'How to Rest Better' : 'Management Strategies'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.content.management.map((strategy, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{strategy}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}

            {/* Professional Help Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-6 border border-teal-500/30 text-center"
            >
              <h3 className="text-lg font-semibold text-teal-400 mb-2">Remember</h3>
              <p className="text-white">
                This information is for educational purposes only. If you're experiencing persistent mental health concerns, 
                please consult with a qualified mental health professional.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentalHealthInfoModal;