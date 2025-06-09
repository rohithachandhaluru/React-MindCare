import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Phone } from 'lucide-react';

interface LocalResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocalResourcesModal: React.FC<LocalResourcesModalProps> = ({ isOpen, onClose }) => {
  const localResources = [
    {
      name: "Apollo Mental Health Center",
      address: "Road No. 72, Jubilee Hills, Hyderabad, Telangana 500033",
      timing: "24/7 Emergency Services",
      contact: "+91 40 2355 1066",
      type: "Hospital"
    },
    {
      name: "NIMHANS Bangalore",
      address: "Hosur Road, Bangalore, Karnataka 560029",
      timing: "Mon-Sat: 8:00 AM - 5:00 PM",
      contact: "+91 80 2699 5000",
      type: "Institute"
    },
    {
      name: "Fortis Mental Health",
      address: "154/9, Bannerghatta Road, Bangalore, Karnataka 560076",
      timing: "24/7 Emergency Services",
      contact: "+91 80 6621 4444",
      type: "Hospital"
    },
    {
      name: "Cadabams Hospitals",
      address: "Survey No. 135/1, Kanakapura Road, Bangalore, Karnataka 560082",
      timing: "Mon-Sun: 9:00 AM - 6:00 PM",
      contact: "+91 97414 76476",
      type: "Rehabilitation"
    },
    {
      name: "Manas Foundation",
      address: "Plot No. 12, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034",
      timing: "Mon-Fri: 9:00 AM - 6:00 PM",
      contact: "+91 40 2354 1020",
      type: "NGO"
    },
    {
      name: "Asha Hospital",
      address: "201, Banjara Hills, Hyderabad, Telangana 500034",
      timing: "24/7 Emergency Services",
      contact: "+91 40 4455 4455",
      type: "Hospital"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Hospital': return 'from-red-500 to-pink-500';
      case 'Institute': return 'from-blue-500 to-indigo-500';
      case 'Rehabilitation': return 'from-green-500 to-teal-500';
      case 'NGO': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

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
                <MapPin className="h-6 w-6 text-teal-400" />
                <span>Local Mental Health Resources</span>
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

            <p className="text-gray-300 mb-6">
              Find professional mental health support near you. These centers offer various services including emergency care, counseling, and rehabilitation.
            </p>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {localResources.map((resource, index) => (
                <motion.div
                  key={resource.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{resource.name}</h3>
                    <span className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(resource.type)} text-white text-xs rounded-full`}>
                      {resource.type}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{resource.address}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{resource.timing}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <a 
                        href={`tel:${resource.contact}`}
                        className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
                      >
                        {resource.contact}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Get Directions
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-500/30 text-center"
            >
              <h3 className="text-lg font-semibold text-red-400 mb-2">Emergency Support</h3>
              <p className="text-white mb-3">
                If you're experiencing a mental health crisis, don't wait for appointments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:988" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                  Call 988 - Crisis Lifeline
                </a>
                <a href="tel:911" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                  Call 911 - Emergency
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocalResourcesModal;