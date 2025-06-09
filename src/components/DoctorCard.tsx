import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  location: string;
  rating: number;
  image: string;
  status: 'online' | 'busy' | 'offline';
  languages: string[];
  bio: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, index }) => {
  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  const statusText = {
    online: 'Available',
    busy: 'Busy',
    offline: 'Offline',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="relative mb-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-white/20 group-hover:border-teal-400/50 transition-all duration-300"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-4 h-4 rounded-full ${statusColors[doctor.status]} border-2 border-gray-900`}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-white mb-1">{doctor.name}</h3>
        <p className="text-teal-400 text-sm font-medium">{doctor.specialty}</p>
        <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{doctor.experience}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{doctor.rating}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">{doctor.location}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[doctor.status]}`} />
          <span className="text-sm text-gray-300">{statusText[doctor.status]}</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm text-center mb-4 line-clamp-3">
        {doctor.bio}
      </p>

      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {doctor.languages.slice(0, 2).map((lang) => (
          <span
            key={lang}
            className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full"
          >
            {lang}
          </span>
        ))}
      </div>

      <Link to={`/profile/${doctor.id}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
        >
          View Profile
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default DoctorCard;