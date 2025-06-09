import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle } from 'lucide-react';
import { isLoggedIn } from '../utils/auth';
import AuthModal from './AuthModal';

interface ProtectedActionProps {
  children: React.ReactNode;
  onSuccess?: () => void;
  message?: string;
}

const ProtectedAction: React.FC<ProtectedActionProps> = ({ 
  children, 
  onSuccess, 
  message = "Please log in or sign up to access this feature." 
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      e.stopPropagation();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      setShowAuthModal(true);
    } else if (onSuccess) {
      onSuccess();
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <div onClick={handleClick} className="relative">
        {children}
        
        {/* Warning Popup */}
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
          >
            <div className="bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-lg text-white px-4 py-3 rounded-lg shadow-lg border border-orange-500/30 max-w-xs">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{message}</p>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-orange-500/90" />
            </div>
          </motion.div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default ProtectedAction;