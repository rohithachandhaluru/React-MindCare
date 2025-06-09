import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Languages, Award, MessageCircle, Calendar, CreditCard, X } from 'lucide-react';
import AppointmentModal from '../components/AppointmentModal';
import PaymentModal from '../components/PaymentModal';
import ProtectedAction from '../components/ProtectedAction';
import { getScheduledAppointment, hasActiveAppointment, clearScheduledAppointment } from '../utils/auth';

// Mock data for doctors with pricing
const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Clinical Psychology",
    experience: "8 years",
    location: "New York, NY",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    status: "online" as const,
    languages: ["English", "Mandarin", "Spanish"],
    bio: "Specializing in anxiety, depression, and trauma therapy. I believe in creating a safe space where healing can begin.",
    fullBio: "Dr. Sarah Chen is a licensed clinical psychologist with over 8 years of experience helping individuals navigate through anxiety, depression, and trauma. She holds a Ph.D. in Clinical Psychology from Columbia University and is certified in EMDR therapy. Dr. Chen believes in a collaborative approach to therapy, working with clients to develop personalized strategies for healing and growth.",
    specializations: ["Anxiety Disorders", "Depression", "PTSD", "EMDR Therapy", "Cognitive Behavioral Therapy"],
    education: ["Ph.D. Clinical Psychology - Columbia University", "M.A. Psychology - NYU"],
    availability: "Mon-Fri: 9AM-6PM, Sat: 10AM-2PM",
    consultationFee: 500
  },
  {
    id: 2,
    name: "Dr. Marcus Johnson",
    specialty: "Counseling",
    experience: "12 years",
    location: "Los Angeles, CA",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    status: "busy" as const,
    languages: ["English", "French"],
    bio: "Experienced in relationship counseling, life transitions, and personal growth. Together we can navigate your journey.",
    fullBio: "Dr. Marcus Johnson brings 12 years of experience in counseling and therapy, specializing in relationship dynamics, life transitions, and personal development. He has a warm, empathetic approach that helps clients feel heard and understood. Dr. Johnson is particularly skilled in helping couples improve communication and individuals navigate major life changes.",
    specializations: ["Relationship Counseling", "Life Transitions", "Couples Therapy", "Personal Growth", "Communication Skills"],
    education: ["Ph.D. Counseling Psychology - UCLA", "M.S. Marriage & Family Therapy - USC"],
    availability: "Tue-Sat: 10AM-7PM",
    consultationFee: 400
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Psychiatry",
    experience: "15 years",
    location: "Chicago, IL",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    status: "online" as const,
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Board-certified psychiatrist focusing on mood disorders, ADHD, and medication management with compassionate care.",
    consultationFee: 600
  },
  {
    id: 4,
    name: "Alex Thompson",
    specialty: "Life Coaching",
    experience: "6 years",
    location: "Austin, TX",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    status: "online" as const,
    languages: ["English", "German"],
    bio: "Certified life coach helping people find purpose, set goals, and create meaningful change in their lives.",
    consultationFee: 300
  },
  {
    id: 5,
    name: "Dr. Priya Patel",
    specialty: "Therapy",
    experience: "10 years",
    location: "Seattle, WA",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5452272/pexels-photo-5452272.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    status: "offline" as const,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Specializing in mindfulness-based therapy, cultural transitions, and family dynamics. Your story matters.",
    consultationFee: 450
  }
];

const Profile = () => {
  const { id } = useParams();
  const doctor = doctorsData.find(d => d.id === parseInt(id || '1')) || doctorsData[0];
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [scheduledAppointment, setScheduledAppointment] = useState(getScheduledAppointment());
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    setScheduledAppointment(getScheduledAppointment());
  }, []);

  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  const statusText = {
    online: 'Available Now',
    busy: 'Busy',
    offline: 'Offline',
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
    // Auto-open appointment modal after successful payment
    setTimeout(() => {
      setIsAppointmentModalOpen(true);
    }, 500);
  };

  const handleCancelAppointment = () => {
    clearScheduledAppointment();
    setScheduledAppointment(null);
    setShowCancelModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/doctors"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Professionals</span>
          </Link>
        </motion.div>

        {/* Existing Appointment Notice */}
        {scheduledAppointment && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-6 border border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">🎉 You have an upcoming appointment!</h3>
                <p className="text-white">
                  <span className="font-semibold">{scheduledAppointment.doctorName}</span> on{' '}
                  {formatDate(scheduledAppointment.date)} at {scheduledAppointment.time}
                </p>
                <p className="text-gray-300 text-sm">Amount Paid: ₹{scheduledAppointment.amount}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCancelModal(true)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-500/30"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
              <div className="absolute -bottom-2 -right-2">
                <div className={`w-8 h-8 rounded-full ${statusColors[doctor.status]} border-4 border-gray-900 flex items-center justify-center`}>
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{doctor.name}</h1>
              <p className="text-xl text-teal-400 mb-4">{doctor.specialty}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{doctor.rating} rating</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${statusColors[doctor.status]}`} />
                <span className="text-gray-300">{statusText[doctor.status]}</span>
              </div>

              {/* Consultation Fee */}
              <div className="bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-2xl p-4 border border-teal-500/30 mb-6">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <CreditCard className="h-5 w-5 text-teal-400" />
                  <span className="text-white font-medium">Consultation Fee:</span>
                  <span className="text-2xl font-bold text-teal-400">₹{doctor.consultationFee}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              {!scheduledAppointment && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <ProtectedAction
                    onSuccess={() => window.location.href = `/chat/${doctor.id}`}
                    message="Please log in to start a chat session."
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Start Chat</span>
                    </motion.button>
                  </ProtectedAction>
                  
                  <ProtectedAction
                    onSuccess={() => setIsPaymentModalOpen(true)}
                    message="Please log in to schedule an appointment."
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>{isPaid ? 'Schedule Appointment' : 'Pay & Schedule'}</span>
                    </motion.button>
                  </ProtectedAction>
                </div>
              )}

              {isPaid && !scheduledAppointment && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
                >
                  <p className="text-green-400 text-sm">
                    ✅ Payment completed! You can now schedule your appointment.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-400" />
              <span>About</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">{doctor.fullBio || doctor.bio}</p>
            
            <div className="mb-4">
              <h4 className="text-lg font-medium text-white mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {(doctor.specializations || [doctor.specialty]).map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-500/20 text-teal-400 text-sm rounded-full border border-teal-500/30"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages & Availability */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Languages */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Languages className="h-5 w-5 text-indigo-400" />
                <span>Languages</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full border border-indigo-500/30"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-pink-400" />
                <span>Availability</span>
              </h3>
              <p className="text-gray-300">
                {doctor.availability || "Available for appointments Monday through Friday, 9AM to 5PM EST. Emergency support available 24/7 through our crisis line."}
              </p>
            </div>

            {/* Education */}
            {doctor.education && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Education</span>
                </h3>
                <ul className="text-gray-300 space-y-2">
                  {doctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        doctorName={doctor.name}
        doctorId={doctor.id.toString()}
        amount={doctor.consultationFee}
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        doctorName={doctor.name}
        doctorId={doctor.id.toString()}
        isPaid={isPaid}
      />

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCancelModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Cancel Appointment</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to cancel your appointment with {scheduledAppointment?.doctorName}?
            </p>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Keep Appointment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelAppointment}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Cancel Appointment
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;