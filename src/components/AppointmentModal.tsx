import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check, AlertTriangle } from 'lucide-react';
import { isLoggedIn, getScheduledAppointment, hasActiveAppointment, isTimeSlotAvailable, isToday } from '../utils/auth';
import ProtectedAction from './ProtectedAction';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  doctorId: string;
  isPaid?: boolean;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  isOpen, 
  onClose, 
  doctorName, 
  doctorId, 
  isPaid = false 
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [existingAppointment, setExistingAppointment] = useState(getScheduledAppointment());

  useEffect(() => {
    setExistingAppointment(getScheduledAppointment());
  }, [isOpen]);

  // Generate available dates (only future dates)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 30; i++) { // Include today (i = 0)
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Generate available time slots with current time logic
  const getTimeSlots = () => {
    const slots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30'
    ];

    return slots.map(slot => {
      const isAvailable = isTimeSlotAvailable(slot, selectedDate);
      const isPast = !isAvailable && isToday(selectedDate);
      
      return {
        time: slot,
        disabled: !isAvailable,
        isPast: isPast
      };
    });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime && isLoggedIn() && isPaid) {
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
        setSelectedDate('');
        setSelectedTime('');
        onClose();
      }, 3000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // If user has an existing appointment, show that instead
  if (existingAppointment) {
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
              className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-teal-400" />
                  <span>Existing Appointment</span>
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

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">You Already Have an Appointment!</h3>
                
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-6">
                  <p className="text-gray-300 mb-2">
                    <span className="text-teal-400 font-semibold">{existingAppointment.doctorName}</span>
                  </p>
                  <p className="text-white font-medium mb-1">
                    {formatDate(existingAppointment.date)}
                  </p>
                  <p className="text-gray-300 flex items-center justify-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{existingAppointment.time}</span>
                  </p>
                  <p className="text-green-400 text-sm mt-2">
                    Amount Paid: ₹{existingAppointment.amount}
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Your appointment is confirmed. You'll receive a reminder before the scheduled time.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
            className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {!isConfirmed ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-teal-400" />
                    <span>Schedule Appointment</span>
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

                {!isPaid && (
                  <div className="mb-6 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                    <p className="text-orange-400 text-sm">
                      ⚠️ Please complete payment first to unlock appointment scheduling.
                    </p>
                  </div>
                )}

                <p className="text-gray-300 mb-6">
                  Book your appointment with <span className="text-teal-400 font-semibold">{doctorName}</span>
                </p>

                {/* Date Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Select Date</h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {generateAvailableDates().slice(0, 15).map((date) => {
                      const isDateToday = isToday(date);
                      return (
                        <motion.button
                          key={date}
                          whileHover={{ scale: isPaid ? 1.05 : 1 }}
                          whileTap={{ scale: isPaid ? 0.95 : 1 }}
                          onClick={() => isPaid && setSelectedDate(date)}
                          disabled={!isPaid}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedDate === date
                              ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg shadow-teal-500/25'
                              : !isPaid
                              ? 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                              : isDateToday
                              ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                          {isDateToday && <div className="text-xs">Today</div>}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {getTimeSlots().map((slot) => (
                      <motion.button
                        key={slot.time}
                        whileHover={{ scale: (!slot.disabled && isPaid) ? 1.05 : 1 }}
                        whileTap={{ scale: (!slot.disabled && isPaid) ? 0.95 : 1 }}
                        onClick={() => (!slot.disabled && isPaid) && setSelectedTime(slot.time)}
                        disabled={slot.disabled || !isPaid}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedTime === slot.time
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                            : slot.isPast
                            ? 'bg-red-500/20 text-red-400 cursor-not-allowed border border-red-500/30'
                            : slot.disabled || !isPaid
                            ? 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {slot.time}
                        {slot.isPast && <div className="text-xs">Past</div>}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <ProtectedAction
                  onSuccess={handleConfirm}
                  message="Please log in to schedule an appointment."
                >
                  <motion.button
                    whileHover={{ scale: (isPaid && selectedDate && selectedTime) ? 1.02 : 1 }}
                    whileTap={{ scale: (isPaid && selectedDate && selectedTime) ? 0.98 : 1 }}
                    disabled={!selectedDate || !selectedTime || !isPaid}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    {!isPaid ? 'Complete Payment First' : 'Confirm Appointment'}
                  </motion.button>
                </ProtectedAction>
              </>
            ) : (
              /* Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Appointment Confirmed!</h3>
                
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 mb-6">
                  <p className="text-gray-300 mb-2">
                    <span className="text-teal-400 font-semibold">{doctorName}</span>
                  </p>
                  <p className="text-white font-medium mb-1">
                    {formatDate(selectedDate)}
                  </p>
                  <p className="text-gray-300 flex items-center justify-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTime}</span>
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm">
                  You'll receive a confirmation email shortly. This window will close automatically.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;