import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Download, ExternalLink, Heart, Brain, Users, Shield } from 'lucide-react';

const Resources = () => {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Educational Materials",
      description: "Comprehensive guides and articles about mental health",
      resources: [
        "Understanding Anxiety Disorders",
        "Depression: Signs and Support",
        "Stress Management Techniques",
        "Building Resilience"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Video,
      title: "Video Resources",
      description: "Guided sessions and educational videos",
      resources: [
        "Meditation and Mindfulness",
        "Breathing Exercises",
        "Progressive Muscle Relaxation",
        "Crisis Intervention Techniques"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Download,
      title: "Downloadable Tools",
      description: "Worksheets and self-help materials",
      resources: [
        "Mood Tracking Sheets",
        "Coping Strategies Workbook",
        "Emergency Contact Cards",
        "Self-Care Checklists"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: ExternalLink,
      title: "External Resources",
      description: "Trusted organizations and websites",
      resources: [
        "National Alliance on Mental Illness",
        "Mental Health America",
        "Crisis Text Line",
        "SAMHSA Treatment Locator"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const quickAccess = [
    {
      icon: Heart,
      title: "Crisis Support",
      description: "Immediate help when you need it most",
      link: "/crisis",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Mental Health Info",
      description: "Learn about conditions and treatments",
      link: "/about",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Find Support",
      description: "Connect with professionals",
      link: "/doctors",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Privacy & Safety",
      description: "Your security is our priority",
      link: "/privacy",
      color: "from-green-500 to-emerald-500"
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
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access a comprehensive collection of mental health resources, tools, and educational materials to support your wellbeing journey.
          </p>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickAccess.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Resource Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Resource Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.resources.map((resource, resourceIndex) => (
                    <motion.div
                      key={resourceIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + resourceIndex * 0.05 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-300 hover:text-white transition-colors">{resource}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
                >
                  View All Resources
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Mental Health First Aid Guide",
                description: "Learn how to recognize and respond to mental health crises",
                type: "PDF Guide",
                color: "from-blue-500 to-indigo-500"
              },
              {
                title: "Mindfulness Meditation Series",
                description: "10-minute guided meditations for stress relief",
                type: "Video Series",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Crisis Safety Planning Worksheet",
                description: "Create your personalized crisis response plan",
                type: "Worksheet",
                color: "from-green-500 to-teal-500"
              }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-full h-32 bg-gradient-to-r ${resource.color} rounded-xl mb-4 flex items-center justify-center`}>
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wide">{resource.type}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Access Resource
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-8 border border-red-500/30 text-center"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4">Emergency Resources</h2>
          <p className="text-white mb-6">
            If you're experiencing a mental health crisis, these resources are available 24/7:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="tel:988" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
              988 - Crisis Lifeline
            </a>
            <a href="sms:741741" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
              Text 741741
            </a>
            <a href="tel:911" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
              911 - Emergency
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Resources;