import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Check, AlertCircle } from 'lucide-react';
import { addPaymentRecord, saveScheduledAppointment } from '../utils/auth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctorName: string;
  doctorId: string;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  doctorName, 
  doctorId, 
  amount 
}) => {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showScheduling, setShowScheduling] = useState(false);

  const handlePayment = () => {
    const entered = parseFloat(enteredAmount);
    
    if (isNaN(entered)) {
      setErrorMessage('Please enter a valid amount');
      setPaymentStatus('error');
      return;
    }
    
    if (entered !== amount) {
      setErrorMessage(`Please enter the exact amount: ₹${amount}`);
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentRecord = {
        id: Date.now().toString(),
        doctorId,
        doctorName,
        amount: entered,
        date: new Date().toISOString(),
        status: 'completed' as const
      };
      
      addPaymentRecord(paymentRecord);
      setPaymentStatus('success');
      setShowScheduling(true);
    }, 2000);
  };

  const handleScheduleAppointment = () => {
    if (selectedDate && selectedTime) {
      const appointment = {
        doctorId,
        doctorName,
        date: selectedDate,
        time: selectedTime,
        amount,
        scheduledAt: new Date().toISOString()
      };
      
      saveScheduledAppointment(appointment);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setPaymentStatus('idle');
        setEnteredAmount('');
        setErrorMessage('');
        setSelectedDate('');
        setSelectedTime('');
        setShowScheduling(false);
      }, 1000);
    }
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getTimeSlots = () => {
    const slots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30'
    ];

    if (selectedDate === new Date().toISOString().split('T')[0]) {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      
      return slots.filter(slot => {
        const [hour, minute] = slot.split(':').map(Number);
        const slotTime = hour * 60 + minute;
        const currentTimeMinutes = currentHour * 60 + currentMinute;
        return slotTime > currentTimeMinutes;
      });
    }

    return slots;
  };

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onClose();
      setPaymentStatus('idle');
      setEnteredAmount('');
      setErrorMessage('');
      setSelectedDate('');
      setSelectedTime('');
      setShowScheduling(false);
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
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-gray-900/95 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {paymentStatus === 'success' && !showScheduling ? (
              /* Payment Success Screen */
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
                
                <h3 className="text-2xl font-bold text-white mb-4">Payment Successful!</h3>
                <p className="text-gray-300 mb-4">
                  ₹{amount} paid for consultation with <span className="text-teal-400 font-semibold">{doctorName}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowScheduling(true)}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Schedule Appointment Now
                </motion.button>
              </motion.div>
            ) : showScheduling ? (
              /* Scheduling Screen */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Schedule Your Appointment</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Select Date</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {generateAvailableDates().slice(0, 9).map((date) => (
                      <motion.button
                        key={date}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedDate === date
                            ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {new Date(date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Select Time</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {getTimeSlots().map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedTime === time
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: selectedDate && selectedTime ? 1.02 : 1 }}
                  whileTap={{ scale: selectedDate && selectedTime ? 0.98 : 1 }}
                  onClick={handleScheduleAppointment}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Confirm Appointment
                </motion.button>
              </div>
            ) : (
              /* Payment Form */
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-teal-400" />
                    <span>Payment</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    disabled={paymentStatus === 'processing'}
                    className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="mb-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Consultation Fee</h3>
                    <p className="text-gray-300 mb-2">Dr. {doctorName}</p>
                    <p className="text-2xl font-bold text-teal-400">₹{amount}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Enter Amount
                    </label>
                    <input
                      type="number"
                      value={enteredAmount}
                      onChange={(e) => {
                        setEnteredAmount(e.target.value);
                        setErrorMessage('');
                        setPaymentStatus('idle');
                      }}
                      placeholder={`₹${amount}`}
                      disabled={paymentStatus === 'processing'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                    />
                  </div>

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2"
                    >
                      <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <span className="text-red-400 text-sm">{errorMessage}</span>
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: paymentStatus === 'processing' ? 1 : 1.02 }}
                  whileTap={{ scale: paymentStatus === 'processing' ? 1 : 0.98 }}
                  onClick={handlePayment}
                  disabled={paymentStatus === 'processing'}
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  {paymentStatus === 'processing' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Pay Now</span>
                    </>
                  )}
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;