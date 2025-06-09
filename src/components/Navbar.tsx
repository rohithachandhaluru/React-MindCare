import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const location = useLocation();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Support', path: '/doctors' },
    { name: 'Motivation', path: '/motivation' },
    { name: 'Crisis Help', path: '/crisis' },
  ];

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setShowUserProfile(false);
    window.location.href = '/';
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  return (
    <>
      <motion.nav 
        className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-8 w-8 text-pink-400" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                MindCare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-teal-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-pink-500/20 rounded-lg"
                      layoutId="navbar"
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}

              {/* Auth Section */}
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserProfile(true)}
                    className="flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-teal-400 to-indigo-400 flex items-center justify-center">
                      {currentUser.profilePicture ? (
                        <img
                          src={currentUser.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{currentUser.name}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Sign In
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/30 rounded-lg mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'text-teal-400 bg-teal-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth */}
                {currentUser ? (
                  <div className="px-3 py-2 space-y-2">
                    <button
                      onClick={() => {
                        setShowUserProfile(true);
                        setIsOpen(false);
                      }}
                      className="w-full text-left flex items-center space-x-2 text-white hover:text-teal-400 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>{currentUser.name}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-300 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-teal-400 hover:text-teal-300"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <UserProfile
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
    </>
  );
};

export default Navbar;