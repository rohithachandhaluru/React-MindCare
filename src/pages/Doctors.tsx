import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '../components/DoctorCard';
import FilterBar from '../components/FilterBar';

// Mock data for doctors/volunteers
const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Clinical Psychology",
    experience: "8 years",
    location: "New York, NY",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "online" as const,
    languages: ["English", "Mandarin", "Spanish"],
    bio: "Specializing in anxiety, depression, and trauma therapy. I believe in creating a safe space where healing can begin."
  },
  {
    id: 2,
    name: "Dr. Marcus Johnson",
    specialty: "Counseling",
    experience: "12 years",
    location: "Los Angeles, CA",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "busy" as const,
    languages: ["English", "French"],
    bio: "Experienced in relationship counseling, life transitions, and personal growth. Together we can navigate your journey."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Psychiatry",
    experience: "15 years",
    location: "Chicago, IL",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "online" as const,
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Board-certified psychiatrist focusing on mood disorders, ADHD, and medication management with compassionate care."
  },
  {
    id: 4,
    name: "Alex Thompson",
    specialty: "Life Coaching",
    experience: "6 years",
    location: "Austin, TX",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "online" as const,
    languages: ["English", "German"],
    bio: "Certified life coach helping people find purpose, set goals, and create meaningful change in their lives."
  },
  {
    id: 5,
    name: "Dr. Priya Patel",
    specialty: "Therapy",
    experience: "10 years",
    location: "Seattle, WA",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5452272/pexels-photo-5452272.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "offline" as const,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Specializing in mindfulness-based therapy, cultural transitions, and family dynamics. Your story matters."
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Addiction Support",
    experience: "14 years",
    location: "Denver, CO",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5452299/pexels-photo-5452299.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "busy" as const,
    languages: ["English"],
    bio: "Addiction specialist with personal recovery experience. Recovery is possible, and you don't have to do it alone."
  },
  {
    id: 7,
    name: "Maria Santos",
    specialty: "Counseling",
    experience: "7 years",
    location: "Miami, FL",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5452276/pexels-photo-5452276.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "online" as const,
    languages: ["English", "Spanish", "Italian"],
    bio: "Bilingual counselor specializing in LGBTQ+ support, identity issues, and community mental health."
  },
  {
    id: 8,
    name: "Dr. Kevin Park",
    specialty: "Clinical Psychology",
    experience: "9 years",
    location: "Portland, OR",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5452297/pexels-photo-5452297.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    status: "online" as const,
    languages: ["English", "Korean"],
    bio: "Cognitive behavioral therapy specialist helping with anxiety, OCD, and stress management techniques."
  }
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
      const matchesStatus = selectedStatus === 'All Status' || doctor.status === selectedStatus;
      
      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }, [searchTerm, selectedSpecialty, selectedStatus]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Support Professional
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with experienced therapists, counselors, and volunteers who are here to support your mental health journey.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <p className="text-gray-300 text-center">
            Showing {filteredDoctors.length} professional{filteredDoctors.length !== 1 ? 's' : ''} 
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No professionals found</h3>
              <p className="text-gray-300 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('All Specialties');
                  setSelectedStatus('All Status');
                }}
                className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Doctors;