import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (specialty: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedStatus,
  setSelectedStatus,
}) => {
  const specialties = [
    'All Specialties',
    'Clinical Psychology',
    'Counseling',
    'Psychiatry',
    'Therapy',
    'Life Coaching',
    'Addiction Support',
  ];

  const statuses = [
    'All Status',
    'online',
    'busy',
    'offline',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-teal-400" />
        <h3 className="text-lg font-semibold text-white">Find Your Support Professional</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Specialty Filter */}
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty} className="bg-gray-800">
              {specialty}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
        >
          {statuses.map((status) => (
            <option key={status} value={status} className="bg-gray-800">
              {status === 'All Status' ? status : `${status.charAt(0).toUpperCase() + status.slice(1)}`}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default FilterBar;